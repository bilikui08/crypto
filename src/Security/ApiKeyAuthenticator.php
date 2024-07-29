<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class ApiKeyAuthenticator extends AbstractAuthenticator
{
    const HEADER_AUTHORIZATION = 'Authorization';
    const EMAIL_REQUEST_KEY = 'email';
    const PASSWORD_REQUEST_KEY = 'password';

    public function __construct(
        private UserRepository $userRepository, 
        private JWTTokenManagerInterface $jwtManager
    ) {}

    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning `false` will cause this authenticator
     * to be skipped.
     */
    public function supports(Request $request): ?bool
    {
        //dd( $request->isMethod('POST') && $request->getContentType() === 'json'  );
        return $request->isMethod('POST') && $request->getContentType() === 'json';
    }

    public function authenticate(Request $request): Passport
    {
        $parameters = json_decode($request->getContent(), true);

        $email = $parameters[self::EMAIL_REQUEST_KEY] ?? '';
        $password = $parameters[self::PASSWORD_REQUEST_KEY] ?? '';
        
        if (empty($email) || empty($password)) {
            throw new BadCredentialsException('Please fill in your credentials.');
        }

        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($password),
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        $user = $token->getUser();
        $accessToken = $this->jwtManager->create($user);

        return new JsonResponse([
            'message' => 'Authentication successful gustavo',
            'token' => $accessToken
        ], Response::HTTP_OK);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse(['error' => $exception->getMessageKey()], Response::HTTP_UNAUTHORIZED);
    }

    public function start(Request $request, AuthenticationException $authException = null): Response
    {
        return new JsonResponse(['error' => 'Authentication required'], Response::HTTP_UNAUTHORIZED);
    }

    public function supportsRememberMe(): bool
    {
        return false;
    }
}