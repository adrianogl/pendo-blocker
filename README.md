# Pendo Blocker

Extensão para Chrome (Manifest V3) que bloqueia banners, guias e tooltips do [Pendo](https://www.pendo.io/).

## Como funciona

- **Bloqueio de rede:** impede requisições para `pendo.io` e subdomínios e para os arquivos estáticos do Pendo no Google Cloud Storage.
- **CSS de reserva:** esconde os elementos que o Pendo injeta na página (`#pendo-base`, `#pendo-backdrop`, classes `_pendo-*`), para o caso de o script vir de um domínio próprio da empresa.

Clique no ícone para abrir o popup e ligar ou desligar a extensão. A aba atual recarrega quando você muda o estado.

## Instalação

1. Clone o repositório.
2. Abra `chrome://extensions` e ative o **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação** e selecione a pasta do projeto.

Funciona também em Edge, Brave e Arc.

## Aviso

Projeto pessoal, sem vínculo com a Pendo.io. O logo usado nos ícones pertence à Pendo.io, Inc.
