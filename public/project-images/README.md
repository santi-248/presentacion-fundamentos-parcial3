# Project Images Directory

Este directorio contiene diagramas, capturas de pantalla y visualizaciones del proyecto.

## Estructura de Archivos

### Diagramas UML
- **uml-class-diagram.png** - Diagrama de clases del sistema (10 entidades)
- **uml-use-cases.png** - Diagrama de casos de uso (3 actores, 8 casos)

### Screenshots
- **screenshot-dashboard.png** - Dashboard principal con KPIs en tiempo real
- **screenshot-venta-form.png** - Formulario de registro de venta
- **screenshot-reporte.png** - Vista de reporte de ventas

### Arquitectura
- **architecture-flow.png** - Flujo de arquitectura n-capas (Frontend → Backend → BD)
- **database-schema.png** - Esquema relacional de la base de datos

## Cómo Agregar Imágenes

1. Prepara la imagen (PNG o JPG, preferiblemente ≤ 500KB)
2. Coloca el archivo en este directorio
3. Referencia desde el código React:
   ```jsx
   <img src="/project-images/uml-class-diagram.png" alt="..." />
   ```

## Notas

- Las rutas en el código deben comenzar con `/project-images/`
- Se pueden agregar subdirectorios si es necesario (ej: `/uml/`, `/screenshots/`)
- Para imágenes animadas, considerar SVG inline en componentes React
