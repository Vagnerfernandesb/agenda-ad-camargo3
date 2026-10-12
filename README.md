# Agenda PWA — Assembleia de Deus, Ministério do Belém - Camargo 3

Site estático e responsivo com tema preto, dourado e branco. A programação é mantida editando apenas `programacao.js`, sem painel administrativo.

## Arquivos

- `index.html`: página principal.
- `styles.css`: aparência e adaptação para celular.
- `programacao.js`: **arquivo que você edita para alterar os cultos e eventos**.
- `app.js`: exibição da agenda, compartilhamento e instalação.
- `manifest.webmanifest`: configurações PWA.
- `sw.js`: cache offline básico.
- `icon.svg`: ícone.

## Como editar a programação

Abra `programacao.js` em um editor de texto (por exemplo, Bloco de Notas ou Visual Studio Code). Cada atividade segue este formato:

```js
{ tipo:"weekly", titulo:"Culto de ensino", dia:3, horario:"19:30", data:"", descricao:"Na sede da igreja." }
```

- `tipo`: use `weekly` para atividade semanal ou `special` para evento especial.
- `titulo`: nome da atividade.
- `dia`: 0 domingo, 1 segunda, 2 terça, 3 quarta, 4 quinta, 5 sexta, 6 sábado.
- `horario`: formato 24 horas, como `19:30`.
- `data`: para eventos especiais, use `AAAA-MM-DD`; se não houver data definida, deixe `""`.
- `descricao`: local ou informação adicional.

Para acrescentar outra atividade, copie uma linha e separe as entradas com vírgula. Não remova os colchetes `[` `]` nem a estrutura `window.PROGRAMACAO = { atividades: [...] };`. O arquivo já contém exemplos; confira e substitua pelos horários oficiais antes de publicar.

## Testar no computador

O site usa recursos PWA, que precisam de `localhost` ou HTTPS. Se tiver Python instalado, abra um terminal na pasta e execute:

```bash
python -m http.server 8000
```

Depois visite `http://localhost:8000`.

## Publicar gratuitamente no GitHub Pages

1. Entre em https://github.com/ e crie um repositório público chamado `agenda-ad-camargo3`.
2. Envie os arquivos desta pasta para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`, depois salve.
5. Aguarde o GitHub fornecer o endereço do site e abra-o pelo celular. O HTTPS do GitHub Pages permite os recursos PWA.

## Como atualizar depois de publicar

1. Edite `programacao.js` no seu computador.
2. No GitHub, abra esse arquivo e clique no lápis para editar, ou envie a versão atualizada do arquivo.
3. Salve a alteração (Commit changes). O site usará a nova programação.
4. Como o PWA guarda arquivos em cache, se o celular continuar mostrando a versão antiga, feche e abra o site novamente ou atualize a página. Para forçar atualização do cache, altere o valor `CACHE_NAME` no arquivo `sw.js` ao publicar uma versão nova.

## Compartilhar no WhatsApp

O botão de compartilhamento usa o menu de compartilhamento do aparelho quando disponível. Caso contrário, abre o WhatsApp com uma mensagem e o link do site. Publique primeiro para que o link compartilhado seja acessível a todos.

## Observações

- A programação inicial é ilustrativa. Revise os dias e horários antes de divulgar.
- Esta versão não possui login nem painel de edição. Para atualizar, edite `programacao.js` e publique a mudança.
- O cache permite acesso offline básico depois da primeira visita, mas novas alterações só chegam ao aparelho quando ele sincroniza com a versão publicada.
