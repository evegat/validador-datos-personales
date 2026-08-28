## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

<!-- myworld-harness:start version=1.0.0 sha256=de2b54d7dc49d68d5754128796b65c0a5569fb056d0b2ab733987aef6b71fef9 -->
## Harness MyWorld v1

<!-- Este contenido está administrado por MyWorld. Las reglas locales adicionales se conservan. -->

- Antes de escribir, lee `MYWORLD-HARNESS.json` y ejecuta `.myworld-harness/harness.ps1 preflight`.
- Toda tarea no trivial debe tener un `task_id` estable. En repositorios GitHub, el Issue es el ticket canónico y debe conservar ese `task_id`.
- Un agente trabaja en una tarea, rama o worktree y superficie de escritura declarada; el lock representa custodia temporal, no propiedad permanente.
- No mezcles, reviertas ni elimines cambios ajenos.
- Si cambia el agente responsable, genera un handoff estructurado con el mismo `task_id`, revisión exacta, cambios, archivos, pruebas, riesgos, pendientes, rollback e `integration_owner`; libera el lock y el receptor adquiere uno nuevo tras verificar la revisión.
- Ejecuta los gates aplicables y entrega evidencia verificable; no declares pruebas no ejecutadas.
- Tests/verify comprueban comportamiento; RDD autoriza el candidato exacto revisado antes de commit/push/PR/deploy cuando corresponda.
- No imprimas ni almacenes secretos, tokens, cookies o datos personales innecesarios.
- Enviar, publicar, desplegar, borrar, pagar o modificar credenciales/permisos requiere autorización vigente, explícita y específica.
- Todo impedimento se registra como pendiente estructurado y no detiene trabajo independiente.
- Antes de integrar, entrega `task_id`, base revision, cambios, archivos, pruebas, riesgos, pendientes y rollback.
<!-- myworld-harness:end -->
