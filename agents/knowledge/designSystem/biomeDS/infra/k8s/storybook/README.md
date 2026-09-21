# Biome Storybook — deploy k8s

Serve a **Storybook estatica** do Biome Design System em
`https://biome.meioambiente.mg.gov.br`, seguindo o mesmo padrao de runtime
usado por `pseg-ui` no cluster SEMAD.

## Componentes

- `deployment.yaml` — 2 replicas, probes em `/healthz`, porta 80.
- `service.yaml` — ClusterIP 80 -> `http` (80).
- `ingress.yaml` — host `biome.meioambiente.mg.gov.br` com TLS.

## Imagem

O `DockerfileK8s` na raiz do repo e construido a partir de
`dockerhub.meioambiente.mg.gov.br/runtimes/k8s-frontend-node:20-alpine`
(mesma base do pseg-ui) e publica em
`dockerhub.meioambiente.mg.gov.br/semad/biome-storybook:<sha>`.

## Aplicacao

O pipeline de plataforma aplica automaticamente. Para aplicar manualmente,
expanda `${CI_COMMIT_SHORT_SHA}` em `deployment.yaml` pela tag desejada e:

```bash
kubectl apply -n pseg -f deployment.yaml
kubectl apply -n pseg -f service.yaml
kubectl apply -n pseg -f ingress.yaml
```
