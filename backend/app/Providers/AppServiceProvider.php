<?php

namespace App\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->loadAppRoutes();
    }

    /**
     * Carrega as rotas do app diretamente no boot.
     *
     * Feito aqui (e não apenas no RouteServiceProvider) porque o mecanismo
     * de callbacks "booted" de providers deste ambiente não é disparado de
     * forma confiável; o boot() direto do provider é.
     */
    protected function loadAppRoutes(): void
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        $router = $this->app->make(Router::class);

        $hasRootRoute = collect($router->getRoutes()->getRoutes())
            ->contains(fn ($route) => $route->uri() === '/');

        if ($hasRootRoute) {
            return;
        }

        $router->middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        $router->middleware('web')
            ->group(base_path('routes/web.php'));
    }
}
