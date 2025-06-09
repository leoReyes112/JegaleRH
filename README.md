# Proyecto Jegale

## Descripción
Proyecto Jegale es una aplicación web desarrollada con React que permite gestionar vacantes y aplicaciones de candidatos. Incluye componentes para autenticación, gestión de candidatos, reclutadores, y visualización de datos simulados mediante mocks.

## Estructura del Proyecto
- `src/`: Código fuente principal de la aplicación.
  - `components/`: Componentes React organizados por funcionalidad (Auth, Candidate, Recruiter, Layout, etc.).
  - `mock/`: Datos simulados para usuarios, vacantes y base de datos.
  - `utils/`: Utilidades y funciones auxiliares.
- `public/`: Archivos estáticos públicos.
- `package.json`: Dependencias y scripts del proyecto.
- `README.md`: Documentación del proyecto.

## Requisitos
- Node.js (versión recomendada: 16+)
- npm o yarn

## Instalación y Ejecución
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd proyectoJegale
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar la aplicación en modo desarrollo:
   ```bash
   npm start
   ```
4. Abrir en el navegador:
   ```
   http://localhost:3000
   ```

## Arquitectura y Componentes Principales

### Componentes Clave
- **Auth**: Maneja la autenticación de usuarios, incluyendo formularios de login y recuperación de contraseña.
- **Candidate**: Componentes para que los candidatos puedan aplicar a vacantes, ver su dashboard y gestionar sus aplicaciones.
- **Recruiter**: Herramientas para reclutadores, como creación y gestión de vacantes, y revisión de solicitudes.
- **Layout**: Componentes de diseño y estructura general, como navbar y hero sections.
- **Mock**: Datos simulados para pruebas y desarrollo sin backend real.
- **Utils**: Funciones auxiliares reutilizables.

### Flujo de Datos
- Los datos de usuarios, vacantes y solicitudes se manejan inicialmente con mocks en `src/mock/`.
- La aplicación utiliza estado local y React hooks para manejar formularios y vistas.
- Se recomienda integrar un backend real para producción y persistencia de datos.

## Uso y Ejemplos
- Para aplicar a una vacante, el candidato debe completar el formulario en la sección correspondiente.
- Los reclutadores pueden crear y listar vacantes desde su dashboard.
- La navegación es intuitiva mediante el navbar en la parte superior.

## Documentación del Código
- Se recomienda utilizar comentarios en línea y JSDoc para documentar funciones y componentes.
- Para facilitar la generación de documentación, se sugiere usar la extensión de VSCode **Document This** que ayuda a crear comentarios JSDoc automáticamente.
- Para generar documentación HTML a partir de los comentarios JSDoc, se puede usar la herramienta [JSDoc](https://jsdoc.app/):
  ```bash
  npm install -g jsdoc
  jsdoc -c jsdoc.json
  ```
- Para proyectos React, se recomienda usar [Storybook](https://storybook.js.org/) para documentar y visualizar componentes de forma interactiva.

## Herramientas y Extensiones Recomendadas
- **Document This** (VSCode Extension): Genera comentarios JSDoc automáticamente.
- **JSDoc**: Genera documentación HTML a partir de comentarios en el código.
- **Storybook**: Documentación y desarrollo de componentes UI en aislamiento.

## Contribución
- Se agradecen contribuciones mediante pull requests.
- Por favor, siga las convenciones de código y agregue documentación para nuevas funcionalidades.
- Reporte issues para bugs o mejoras.

## Changelog
- **v1.0.0** - Versión inicial con funcionalidades básicas de gestión de vacantes y candidatos.

## Contacto
Para dudas o contribuciones, contactar al equipo de desarrollo: leonardoreyesbautista01@gmail.com.
