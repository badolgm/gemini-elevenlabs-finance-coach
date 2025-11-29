💬 Conversational Financial Assistant (CFA)

<p align="center">
  <img src="https://placehold.co/1200x300/004d40/ffffff?text=Conversational+Financial+Assistant+(CFA)" alt="Banner: Conversational Financial Assistant">
  <br>
  <i>Your Financial Advisor, always a voice command away.</i>
</p>

<p align="center">
  <a href="https://ai-partner-catalyst.devpost.com/"><img src="https://img.shields.io/badge/Devpost-AI%20Partner%20Catalyst-1a73e8" alt="Devpost: AI Partner Catalyst"></a>
  <a href="https://cloud.google.com/vertex-ai"><img src="https://img.shields.io/badge/Google%20Cloud-Vertex%20AI-4285F4" alt="Vertex AI"></a>
  <a href="https://ai.google.dev/gemini-api"><img src="https://img.shields.io/badge/Gemini-API-34A853" alt="Gemini API"></a>
  <a href="https://elevenlabs.io"><img src="https://img.shields.io/badge/ElevenLabs-Agents-ff6b00" alt="ElevenLabs Agents"></a>
  <a href="https://cloud.google.com/firestore"><img src="https://img.shields.io/badge/Firestore-NoSQL-F9AB00" alt="Firestore"></a>
  <a href="https://cloud.google.com/run"><img src="https://img.shields.io/badge/Cloud%20Run-Serverless-00ACC1" alt="Cloud Run"></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-black" alt="MIT License"></a>
</p>

**Quick Links**
- Hackathon: `https://ai-partner-catalyst.devpost.com/`
- Resources: `https://ai-partner-catalyst.devpost.com/resources`
- Vertex AI: `https://cloud.google.com/vertex-ai`
- Gemini API: `https://ai.google.dev/gemini-api`
- ElevenLabs Agents: `https://elevenlabs.io`

**Overview**
- CFA es una app de asistencia financiera conversacional para el reto ElevenLabs del hackathon AI Partner Catalyst (Google Cloud).
- Combina `Gemini` para comprensión/razonamiento financiero y `ElevenLabs Agents` para voz natural (STT/TTS) y personalidad.
- Objetivo: permitir consultas de gastos, presupuestos, registro de transacciones y consejos proactivos mediante voz.

**Selected Challenge**
- ElevenLabs: crear una app conversacional, inteligente y basada en voz usando `ElevenLabs Agents` con `Vertex AI`/`Gemini`.

**Features**
- Consulta de gastos por categoría y periodo.
- Presupuestos por voz con seguimiento y proyección mensual.
- Registro de transacciones hablado con extracción de entidad/importe.
- Consejos financieros personalizados generados por `Gemini`.
- Voz natural multilingüe mediante `ElevenLabs`.

**Features Pro**
- Importación de datos (CSV/Excel/API mock) y auto-clasificación.
- Alertas por umbral de gasto y detección de anomalías.
- Tendencias por comerciante/semana/mes y multimoneda.
- Export de reportes en CSV/PDF y transcripción de sesiones.
- Personalización de voz/persona del asistente y wake‑word.
- Panel de privacidad con consentimiento y opciones de telemetría.

**Architecture**
- Frontend: Web cliente con integración de `ElevenLabs` (SDK/Agents) para captura y reproducción de audio.
- Backend: Servicio en `Cloud Run`/`Functions` que orquesta `Gemini` y persiste en `Firestore`.
- Datos: colecciones `users`, `transactions`, `budgets`, `sessions`, `telemetry`.
- Observabilidad/Seguridad: logging estructurado, trazas, control de claves con `Secret Manager`.

**Technology Stack**
- IA: `Gemini` (NLP, clasificación de intención, generación de consejos), `Vertex AI`.
- Voz: `ElevenLabs Agents` (ASR/TTS, personalidad del asistente).
- Backend: `Cloud Run`/`Functions` con Node/TypeScript o Python.
- DB: `Firestore` (NoSQL) para transacciones, presupuestos y sesiones.

**Getting Started**
- Requisitos: cuenta de Google Cloud, claves de `Gemini`/`Vertex AI`, cuenta de `ElevenLabs`.
- Configuración:
  - Crear proyecto GCP y habilitar `Vertex AI`.
  - Configurar claves en `Secret Manager` o variables de entorno locales.
  - Instalar dependencias y lanzar servidor (se proveerán instrucciones detalladas al añadir el código).

**Local Development**
- Backend:
  - `cd backend`
  - `npm install`
  - `npm run dev` → `http://localhost:3001/` (`/health`, `/api/*` stubs)
- Frontend:
  - `cd frontend`
  - `npm install`
  - `npm run dev` → `http://localhost:5173/`
- Notas:
  - Las rutas de API están stubbed para validar flujo end-to-end.
  - Claves y configuración se añadirán con `Secret Manager`/`.env` antes de integrar servicios reales.

**Hackathon Compliance**
- Repositorio público con licencia OSI visible y detectable.
- Video demo ≤ 3 min.
- URL de proyecto desplegado accesible para jueces.
- Selección del desafío: ElevenLabs.

**Roadmap**
- M0: Conversación básica y consultas de gasto.
- M1: Presupuestos y proyección con consejos.
- M2: Import/export, tendencias y transcripciones.
- M3: Alertas/anomalías, privacidad y voz personalizada.
- M4: Metas, gamificación y wake‑word manos libres.

**Documentation**
- Especificación completa en `MASTERDOC.md` (arquitectura, UML, DB, flujos, pruebas, seguridad).

**License**
- MIT. Ver sección `License` y archivo `LICENSE`.

**Acknowledgements**
- Google Cloud, ElevenLabs, comunidad Devpost.
