# BCI Ventures SEO Audit and Implementation

## Executive Summary

The project is a React 18, TypeScript, and Vite single-page application, deployed as a static site with a Vercel catch-all rewrite. The strongest supported organic-search topic is BCI's AI and practical technology courses. No production domain, Search Console property, analytics property, keyword data, or live performance report was present in the project, so this audit does not claim search volume, ranking positions, Core Web Vitals scores, or a ranking guarantee.

Technical status: core metadata, canonical handling, index controls, Organization structured data, and a production-build sitemap generator have been added. The sitemap is generated only when a canonical site URL is configured. The site remains client-rendered; static HTML for every route has not been generated, so Google and social crawlers still depend on JavaScript for route content and dynamic metadata.

## Findings by Severity

### Critical

- None found in the files inspected that can be confirmed as a site-wide crawl blocker. A public deployment and live crawl are still needed to verify this.

### High

- All routes originally shared one generic title and description from `index.html`; route-aware titles, descriptions, canonicals, social metadata, and `noindex` handling are now managed by the router.
- No sitemap existed. A build script now emits `dist/sitemap.xml` and adds its URL to the built `robots.txt` when `VITE_SITE_URL`, `SITE_URL`, or Vercel's production-domain variable is available. Without one, it warns and skips generation rather than publishing a fake hostname.
- The Vercel fallback serves the SPA shell for unknown paths. The app renders a not-found page, but the current static rewrite may still return HTTP 200 for unknown routes (a soft 404); verify the deployed response and consider SSR/static route output or hosting-specific 404 handling.
- Search engines and social crawlers initially receive a client-rendered shell. Google can render JavaScript, but rendering is deferred and some social crawlers do not execute it. Route metadata improves after hydration; server rendering or prerendered route HTML remains a recommended follow-up.
- The demo session is now priced at zero and labeled “Free” in both the course catalog and mock-data normalization. Confirm any operational eligibility conditions before publishing them. The certification page uses “official” and “recognized credential” wording, for which no external accreditation evidence is present in the project.

### Medium

- Course-detail content depth is uneven. Several course entries have no modules, while the detail template repeats generic FAQs. Add accurate, course-specific curriculum, outcomes, prerequisites, delivery details, and instructor information before targeting competitive non-branded queries.
- The home page lists web, app, marketing, hosting, and branding services, but there are no dedicated service pages or detailed supporting proof. Do not target those as service-company keywords until offerings and evidence are confirmed and useful pages exist.
- The site provides only “India” as an address. There is no confirmed city, postal address, or Google Business Profile information, so city pages and LocalBusiness markup are not recommended.
- No analytics or Search Console verification/configuration was found. Search performance and user acquisition cannot currently be measured from repository configuration.
- No Open Graph or Twitter metadata was present in the initial HTML. Generic social metadata and route-specific values are now provided; the logo is used as the image until a suitable share image is supplied.
- The public certificate verification and registration pages are utility/conversion pages, not sitemap targets. They are marked `noindex`; login and admin paths are also excluded from indexing.

### Low

- The language and viewport declarations and favicon are present. Sitemap metadata and a language-region (`en-IN`) decision can be revisited after confirming the intended audience and final language strategy.
- No blog or editorial content exists. Create articles only when BCI can provide original, maintained expertise; do not publish a batch of thin pages to cover keyword variants.

## Scope Inspected

- Framework, Vite build configuration, frontend routes, public page components, shared layout and navigation surface, course/company data, public assets, Vercel rewrite, and robots file.
- Existing analytics, metadata, schema, sitemap, and Search Console strings in the frontend.
- The audit did not have access to a production URL, Google Search Console, a keyword research account, analytics reports, a live Lighthouse run, or a full mobile-device test. These are open validation tasks, not assumed successes.

## Keyword Strategy and Mapping

Search volume, difficulty scores, SERP features, and current positions are **unavailable** without a keyword tool and verified Search Console data. The recommendations below are relevance-based hypotheses, not measured demand. Broad phrases such as “AI course” and “website development company” are competitive by nature; actual SERP competition has not been measured.

| Target page | Primary topic | Related terms and intent | Recommendation |
| --- | --- | --- | --- |
| `/` | BCI Ventures; BCI Ventures Private Limited | BCI AI courses, BCI AI training; navigational | Use the home page for the brand and a concise description of the real education offer. |
| `/about` | BCI Ventures AI education | AI learning team, practical technology education; informational/navigational | Keep founder and mentor details accurate and attributable. |
| `/courses` | AI courses | AI training, AI classes, AI courses for beginners; commercial | Main course discovery and comparison page. |
| `/courses/beginner` | Beginner AI course | AI training for beginners, practical AI course, AI tools course; commercial | Strongest non-brand course cluster if curriculum and schedule remain accurate. |
| `/courses/advanced` | Advanced AI course | AI agents course, AI automation training, AI for business; commercial | Target only the topics actually taught in the published curriculum. |
| `/courses/prompt-engineering` | Prompt engineering course | prompt engineering training; commercial | Dedicated existing course; add verifiable learning outcomes and syllabus. |
| `/courses/image-generation` | AI image generation course | generative AI tools; commercial | Keep focused on course instruction, not image-generation services. |
| `/courses/video-generation` | AI video generation course | AI video tools; commercial | Keep focused on course instruction. |
| `/courses/website-development` | Website development course | website building course; commercial | Do not map “website development company/services” here. |
| `/courses/app-development` | App development course | mobile app development course; commercial | Do not imply BCI provides app-development services. |
| `/courses/learn-ai-for-study` | Learn AI for study | AI tools for students, AI for students; informational/commercial | Explain responsible, practical student use in original detail. |
| `/courses/presentation-development` | Presentation development course | AI presentation design; commercial | Describe AI use only to the extent it is part of the actual course. |
| `/courses/demo-class` | AI demo class | introductory AI class; commercial | Listed as free; clarify any eligibility conditions accurately. |
| `/courses/beginner-advanced-combo` | AI beginner and advanced course bundle | AI training program; commercial | State inclusions, price, and combined duration accurately. |
| `/certification` | BCI course completion certificates | verify BCI certificate; navigational | Avoid “accredited,” “recognized,” or “official” unless independently substantiated. |
| `/contact` | Contact BCI Ventures | BCI course enquiries; transactional | Keep real contact details consistent. No city target is supported yet. |

Do not target “AI certification course” as an accredited qualification, nor web/app development company, digital marketing agency, SEO services, branding agency, or AI consulting terms based only on course titles or the home-page service list.

## On-Page Metadata

The router now sets unique title, description, canonical URL, Open Graph title/description/image/URL, and Twitter title/description. Public page metadata is:

| Route | Title | Description |
| --- | --- | --- |
| `/` | BCI Ventures \| Practical AI Courses and Training | Explore practical AI courses from BCI Ventures, including beginner AI, prompt engineering, AI agents and automation training. |
| `/about` | About BCI Ventures \| AI Learning in India | Meet BCI Ventures' founders and mentors and learn about the team's practical approach to AI and technology education. |
| `/courses` | AI Courses for Beginners \| BCI Ventures | Compare BCI AI courses in prompt engineering, generative AI, AI for study, website development and more. |
| `/courses/:slug` | `{course.title} Course \| BCI Ventures` | Current course overview, followed by course-detail and registration wording; limited to 160 characters. |
| `/certification` | BCI Course Certificates \| BCI Ventures | See how BCI course completion certificates work and verify a certificate issued for a completed course. |
| `/certificate/verify` | Verify a BCI Course Certificate | Check the authenticity of a BCI course certificate using its certificate ID. `noindex,follow`. |
| `/contact` | Contact BCI Ventures \| AI Courses and Enquiries | Contact BCI Ventures with questions about AI courses, course schedules, registration or certificates. |
| `/register` | Register for a BCI Course | Submit a registration enquiry for a BCI AI or technology course. `noindex,follow`. |
| `/login` | Student Login \| BCI Ventures | Sign in to BCI Ventures. `noindex,follow`. |
| `/admin`, `/admin/login`, and `/admin/*` | Admin Portal/Login \| BCI Ventures | Administration portal copy. `noindex,follow`. |
| Unknown routes | Page Not Found \| BCI Ventures | The requested BCI Ventures page could not be found. `noindex,follow`. |

Course detail titles and descriptions use the matching course's current data. Production canonical consistency should be confirmed by setting `VITE_SITE_URL` to the final HTTPS domain. Metadata is currently updated after JavaScript runs; initial static HTML still has only the generic home-page metadata.

## Structured Data

The home route emits an `Organization` object using the company name, legal name, logo, email, telephone, and current description. No LocalBusiness, address, rating, review, award, accreditation, or unverified price schema is emitted. Validate the production markup with Google's Rich Results Test and Schema Markup Validator after deployment. Structured data does not guarantee a rich result or ranking increase.

## Editorial Opportunities

These are research hypotheses, not validated volume opportunities or published pages. Publish only when BCI can add original examples and expert review. A future `/blog` route should not be added until there is enough useful content to support it.

| Candidate title / H1 | Primary and secondary topics | Intent | Future URL | Outline and internal links |
| --- | --- | --- | --- | --- |
| What Is Prompt Engineering? A Practical Beginner's Guide | prompt engineering; how to write AI prompts, prompt examples | Informational | `/blog/prompt-engineering-basics` | Explain prompts and context; show before/after examples; cover iteration and limitations; link to Prompt Engineering and Beginner courses. |
| How Students Can Use AI to Study Responsibly | AI tools for students; AI for study, learn with AI | Informational | `/blog/ai-for-students` | Research and note-taking; active recall and revision; fact-checking; privacy and academic-integrity cautions; link to Learn AI for Study. |
| A Beginner's Guide to Generating Images with AI | AI image generation; image-generation prompts, generative AI images | Informational | `/blog/ai-image-generation-guide` | Describe subject and composition; refine prompts; evaluate outputs; discuss rights and disclosure; link to Image Generation. |
| AI Agents vs. Automation: What Is the Difference? | AI agents; AI automation, business automation | Informational | `/blog/ai-agents-vs-automation` | Define each approach; compare control and reliability; give workflow examples; discuss human review; link to Advanced Batch. |
| A Practical Checklist for Trying AI in a Small Business | AI for business; practical AI workflows, responsible AI adoption | Informational/commercial | `/blog/ai-for-small-business` | Identify a repetitive task; assess data risk; run a limited pilot; keep human review; measure outcomes; link to Advanced Batch only where course content matches. |

For all candidate queries, search volume, current ranking, keyword difficulty, SERP features, and live competitor analysis remain unavailable. Search Console query data and a keyword-research source should decide which, if any, are worth writing.

## Sitemap and Robots

- Source `robots.txt` allows crawling. The build appends the sitemap URL only after a real canonical host is available.
- The sitemap lists the home, about, course catalog, current course slugs, certification, and contact pages. It excludes login, admin, registration, and certificate lookup utilities.
- Configure `VITE_SITE_URL` in the frontend build/deployment environment, for example `https://www.your-confirmed-domain.com`. Do not leave the example host in production. The sitemap script accepts `SITE_URL` or `VERCEL_PROJECT_PRODUCTION_URL` as alternatives.
- If published courses are added or removed through the admin, keep the sitemap course list in `frontend/scripts/generate-sitemap.mjs` synchronized or make sitemap generation read the published-course source.

## Internal Linking and Content

Keep the primary path clear: home → courses → relevant course detail → registration; about/contact pages should be reachable from the shared navigation/footer. Link course content only to related courses and useful contact/registration destinations. Avoid adding repeated keyword anchors. Improve course pages with unique, factual syllabus and outcome information before creating separate service or blog pages.

## Performance, Mobile, and Accessibility

No production Web Vitals or repeatable Lighthouse measurements were available, so this report assigns no performance score and claims no LCP/CLS/INP improvement. A 390px viewport spot check of `/courses` showed no horizontal overflow; this is not a full mobile audit. The existing application uses client-side JavaScript and Framer Motion; measure the deployed site on mobile and desktop before optimizing. Check image dimensions/compression, font loading, layout shifts, navigation/forms, keyboard operation, field labels, color contrast, heading structure, and horizontal overflow with real device emulation and assistive-technology checks.

## Search Console Setup

1. Deploy to the confirmed HTTPS production domain and set `VITE_SITE_URL` in the frontend build environment, then rebuild and verify `/sitemap.xml` and `/robots.txt`.
2. Open Google Search Console and add a **Domain** property for the root domain, or a URL-prefix property for the exact canonical URL.
3. Verify ownership using the DNS TXT record for a Domain property. For URL-prefix verification, use the HTML file or meta-tag method and follow Google's current instructions.
4. Submit `https://YOUR-DOMAIN/sitemap.xml` in Search Console's Sitemaps report.
5. Use URL Inspection on the home, course catalog, and important course pages. Check the tested URL, rendered page, canonical selected by Google, and indexing status; request indexing for important changed pages.
6. After data accumulates, use Performance reports to inspect queries, impressions, clicks, CTR, and average position by page and country. Use the Page Indexing and Core Web Vitals reports to identify technical issues.
7. Check Enhancements/Rich results only if Google reports eligible structured data. Validate schema independently; Google does not guarantee a rich result.

## 90-Day Plan

- **Days 1–14:** Confirm the production domain, company/legal naming, demo price, certificate wording, course delivery/schedule facts, and which listed services BCI genuinely sells. Deploy; configure Search Console and analytics with consent/privacy requirements; submit the generated sitemap; inspect key URLs.
- **Days 15–45:** Use Search Console's query/page data to establish a baseline. Expand the real course descriptions and syllabi, resolve empty course-module sections, add instructor/experience evidence, and improve mobile/accessibility issues found in testing.
- **Days 46–75:** Prioritize pages with relevant impressions but weak CTR or rankings. Publish a small number of original AI learning resources that the team can maintain, then link them to the specific related course.
- **Days 76–90:** Review query growth, index coverage, conversions, and Core Web Vitals. Refresh pages using observed demand; pursue legitimate partnerships and mentions rather than paid or fabricated links. Reassess whether evidence supports any separate service pages or local targeting.

## Verification Performed

- `npm run build` completed successfully with TypeScript and Vite.
- Browser checks confirmed route-specific titles/canonicals on the home, course catalog, course-detail, company, certification, contact, login, registration, certificate-lookup, and admin-login routes. Utility/admin routes received `noindex`; the home route emitted Organization JSON-LD.
- The sitemap generator produced 16 absolute URLs and a matching robots directive when given a local test URL. A clean build without a production URL correctly skipped sitemap output.
- A 390px mobile viewport check of the course catalog found no horizontal overflow. No deployed crawl, full accessibility audit, or Web Vitals measurement was performed.

## Remaining Constraints

- No process can guarantee a first-place Google ranking. Rankings depend on competition, location, domain history, content usefulness, technical rendering, and legitimate authority.
- Actual keyword volumes/difficulty, current rankings, SERP competitors, Core Web Vitals, and indexing status need the live domain and relevant tools/accounts.
- The public production domain and intended canonical host were not in the repository. The sitemap intentionally stays absent until the build receives one.
- This implementation improves route metadata and crawl guidance but does not replace server-side rendering/prerendering or a deployed crawl.