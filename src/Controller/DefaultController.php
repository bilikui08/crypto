<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends AbstractController
{
    public function __invoke(): Response
    {
        return $this->render('default/index.html.twig', [
            //'user' => $user,
        ]);
    }
}
