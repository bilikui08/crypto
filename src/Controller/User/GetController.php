<?php

namespace App\Controller\User;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class GetController extends AbstractController
{
    public function __invoke(TokenStorageInterface $tokenStorage): Response
    {
        $token = $tokenStorage->getToken();

        $user = $token->getUser();

        dd( $user->getEmail() );

        return $this->json([
            'email' => $user->getEmail()
            // otros campos del user que pueda devolver...
        ]);
    }
}