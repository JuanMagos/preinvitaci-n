# Validación

- Lint con cero advertencias.
- Build de producción con verificación TypeScript.
- Dos pruebas unitarias del countdown: conversión de zona horaria/desglose y detención en cero.
- Arranque de desarrollo comprobado tras activar polling para evitar `EMFILE` en este entorno.
- Revisión visual en el navegador integrado: portada de escritorio y composición móvil de 390 px, sin desbordamiento horizontal (ancho de contenido y viewport: 390).
- Interacción comprobada: Descubrir cambia el foco a la historia e inicia el estado de reproducción; silenciar y pausar actualizan correctamente los controles. Countdown visible y activo. Sin errores de consola observados.

Limitaciones: no se ejecutó una matriz completa de dispositivos ni una auditoría formal de accesibilidad. La prueba automatizada de navegador externo fue bloqueada por el sandbox; la revisión se realizó en el navegador integrado. La calidad sonora se debe aprobar con la pista definitiva.
