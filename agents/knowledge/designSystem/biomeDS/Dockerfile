# Dockerfile para uso LOCAL (laptop do dev).
#
# Usa a imagem publica node:20-alpine porque a maquina do dev normalmente nao
# tem acesso ao registry interno. Em cluster, usar DockerfileK8s (mesma imagem
# de runtime que o pseg-ui).
#
# Fluxo:
#   pnpm build-storybook
#   docker build -t biome-storybook .
#   docker run --rm -p 3000:80 biome-storybook
#   abrir http://localhost:3000

FROM node:20-alpine

WORKDIR /app

# Storybook estatica ja compilada pelo build do dev.
COPY storybook-static ./storybook-static/
# Mantenha serve.mjs alinhado a docker/serve.ts: `pnpm build:docker-serve`
COPY docker/serve.mjs ./serve.mjs

ENV PORT=80
ENV STORYBOOK_STATIC_DIR=/app/storybook-static

EXPOSE 80

CMD ["node", "serve.mjs"]
