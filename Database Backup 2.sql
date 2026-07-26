--
-- PostgreSQL database cluster dump
--

-- Started on 2026-07-24 17:41:23

\restrict RCu2NZmYcpa0tDXVmp55sGiCXl6pLouwTzA2fzCHWLY6x0LsVKlU7X41FfQKWem

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE cloud_admin;
ALTER ROLE cloud_admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE neon_service;
ALTER ROLE neon_service WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:SsG0QnbCiUkL2pfkO/12qw==$5dJkmKl4tRR3hBPklEgnAWyPbPSDNa52Xidq8aCgY8c=:sFkQPDnApvdQzKU94ESWO/NBBXZcQM3ZwVBPPBROrt8=';
CREATE ROLE neon_superuser;
ALTER ROLE neon_superuser WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB NOLOGIN REPLICATION BYPASSRLS;
CREATE ROLE neondb_owner;
ALTER ROLE neondb_owner WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:h0zgw5eQTOw+BmAJI5cZgg==$weortEJDOcawUNnTIOII5yZjiAyxPubjoC4wgDsK0q4=:HPp671TbbOQevGhpNRaZ3yTAdKXvQp1yyjvCRCZ+RRo=';

--
-- User Configurations
--


--
-- Role memberships
--

GRANT neon_superuser TO neon_service WITH INHERIT TRUE GRANTED BY cloud_admin;
GRANT neon_superuser TO neondb_owner WITH INHERIT TRUE GRANTED BY cloud_admin;
GRANT pg_create_subscription TO neon_superuser WITH ADMIN OPTION, INHERIT TRUE GRANTED BY cloud_admin;
GRANT pg_maintain TO neon_superuser WITH ADMIN OPTION, INHERIT TRUE, SET FALSE GRANTED BY cloud_admin;
GRANT pg_monitor TO neon_superuser WITH ADMIN OPTION, INHERIT TRUE GRANTED BY cloud_admin;
GRANT pg_read_all_data TO neon_superuser WITH ADMIN OPTION, INHERIT TRUE GRANTED BY cloud_admin;
GRANT pg_signal_autovacuum_worker TO neon_superuser WITH ADMIN OPTION, INHERIT TRUE, SET FALSE GRANTED BY cloud_admin;
GRANT pg_signal_backend TO neon_superuser WITH ADMIN OPTION, INHERIT TRUE GRANTED BY cloud_admin;
GRANT pg_write_all_data TO neon_superuser WITH ADMIN OPTION, INHERIT TRUE GRANTED BY cloud_admin;






\unrestrict RCu2NZmYcpa0tDXVmp55sGiCXl6pLouwTzA2fzCHWLY6x0LsVKlU7X41FfQKWem

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict KkvOYavaFAhvPedxL489me7DF02AKYbT91XplSmqKnwtcoDuYTCyavCQ8y5wjnN

-- Dumped from database version 18.4 (2773af8)
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-24 17:41:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2026-07-24 17:41:27

--
-- PostgreSQL database dump complete
--

\unrestrict KkvOYavaFAhvPedxL489me7DF02AKYbT91XplSmqKnwtcoDuYTCyavCQ8y5wjnN

--
-- Database "neondb" dump
--

--
-- PostgreSQL database dump
--

\restrict qAP2UIEoJQGTrrMBfcGk1Vd8RHIgZPcGDRYhaGbla8Ix7ZqEfe8v8oU3Mv2gvMF

-- Dumped from database version 18.4 (2773af8)
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-24 17:41:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3694 (class 1262 OID 16394)
-- Name: neondb; Type: DATABASE; Schema: -; Owner: neondb_owner
--

CREATE DATABASE neondb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = builtin LOCALE = 'C.UTF-8' BUILTIN_LOCALE = 'C.UTF-8';


ALTER DATABASE neondb OWNER TO neondb_owner;

\unrestrict qAP2UIEoJQGTrrMBfcGk1Vd8RHIgZPcGDRYhaGbla8Ix7ZqEfe8v8oU3Mv2gvMF
\connect neondb
\restrict qAP2UIEoJQGTrrMBfcGk1Vd8RHIgZPcGDRYhaGbla8Ix7ZqEfe8v8oU3Mv2gvMF

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 247 (class 1259 OID 180242)
-- Name: categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.categories OWNER TO neondb_owner;

--
-- TOC entry 246 (class 1259 OID 180241)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3696 (class 0 OID 0)
-- Dependencies: 246
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 225 (class 1259 OID 40990)
-- Name: comments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    post_id bigint NOT NULL,
    user_id bigint NOT NULL,
    content text
);


ALTER TABLE public.comments OWNER TO neondb_owner;

--
-- TOC entry 224 (class 1259 OID 40989)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.comments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 122911)
-- Name: conversation_members; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.conversation_members (
    conversation_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role text DEFAULT 'member'::text NOT NULL,
    joined_at timestamp with time zone DEFAULT now() NOT NULL,
    last_read_message_id bigint,
    CONSTRAINT conversation_members_role_check CHECK ((role = ANY (ARRAY['member'::text, 'admin'::text])))
);


ALTER TABLE public.conversation_members OWNER TO neondb_owner;

--
-- TOC entry 241 (class 1259 OID 163841)
-- Name: conversations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.conversations (
    id bigint NOT NULL,
    user1_id bigint NOT NULL,
    user2_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT conversations_check CHECK ((user1_id <> user2_id))
);


ALTER TABLE public.conversations OWNER TO neondb_owner;

--
-- TOC entry 240 (class 1259 OID 163840)
-- Name: conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.conversations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.conversations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 41033)
-- Name: events; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.events (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(255),
    description character varying(2000),
    location character varying(255),
    start_time timestamp without time zone,
    url text NOT NULL
);


ALTER TABLE public.events OWNER TO neondb_owner;

--
-- TOC entry 229 (class 1259 OID 41046)
-- Name: events_attendance; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.events_attendance (
    event_id bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.events_attendance OWNER TO neondb_owner;

--
-- TOC entry 227 (class 1259 OID 41032)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 73747)
-- Name: friend_requests; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.friend_requests (
    sender_id bigint NOT NULL,
    receiver_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.friend_requests OWNER TO neondb_owner;

--
-- TOC entry 230 (class 1259 OID 73728)
-- Name: friends; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.friends (
    user1_id bigint NOT NULL,
    user2_id bigint NOT NULL,
    CONSTRAINT friends_check CHECK ((user1_id < user2_id))
);


ALTER TABLE public.friends OWNER TO neondb_owner;

--
-- TOC entry 226 (class 1259 OID 41013)
-- Name: likes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.likes (
    user_id bigint NOT NULL,
    post_id bigint NOT NULL
);


ALTER TABLE public.likes OWNER TO neondb_owner;

--
-- TOC entry 245 (class 1259 OID 180225)
-- Name: listings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.listings (
    id integer NOT NULL,
    seller_id integer,
    title character varying(255) NOT NULL,
    description text,
    price numeric(10,2),
    image_url text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    category_id integer
);


ALTER TABLE public.listings OWNER TO neondb_owner;

--
-- TOC entry 244 (class 1259 OID 180224)
-- Name: listings_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.listings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.listings_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3697 (class 0 OID 0)
-- Dependencies: 244
-- Name: listings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.listings_id_seq OWNED BY public.listings.id;


--
-- TOC entry 243 (class 1259 OID 163865)
-- Name: messages; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.messages (
    id bigint NOT NULL,
    conversation_id bigint NOT NULL,
    sender_id bigint NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.messages OWNER TO neondb_owner;

--
-- TOC entry 242 (class 1259 OID 163864)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 131073)
-- Name: modules; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.modules (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    atendees integer DEFAULT 0,
    banner_url text NOT NULL
);


ALTER TABLE public.modules OWNER TO neondb_owner;

--
-- TOC entry 235 (class 1259 OID 131079)
-- Name: modules_attendance; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.modules_attendance (
    user_id bigint NOT NULL,
    module_id bigint NOT NULL
);


ALTER TABLE public.modules_attendance OWNER TO neondb_owner;

--
-- TOC entry 233 (class 1259 OID 131072)
-- Name: modules_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.modules ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.modules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 40974)
-- Name: posts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    url text NOT NULL,
    caption text,
    likes integer DEFAULT 0,
    comments integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT posts_comments_nonnegative CHECK ((comments >= 0)),
    CONSTRAINT posts_likes_nonnegative CHECK ((likes >= 0))
);


ALTER TABLE public.posts OWNER TO neondb_owner;

--
-- TOC entry 222 (class 1259 OID 40973)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.posts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 239 (class 1259 OID 147457)
-- Name: replies; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.replies (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    module_id bigint NOT NULL,
    thread_id bigint NOT NULL,
    parent_reply_id bigint,
    body text NOT NULL,
    upvote integer DEFAULT 0,
    downvote integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.replies OWNER TO neondb_owner;

--
-- TOC entry 238 (class 1259 OID 147456)
-- Name: replies_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.replies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.replies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 249 (class 1259 OID 196627)
-- Name: reply_downvote; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.reply_downvote (
    user_id bigint NOT NULL,
    reply_id bigint NOT NULL
);


ALTER TABLE public.reply_downvote OWNER TO neondb_owner;

--
-- TOC entry 248 (class 1259 OID 196608)
-- Name: reply_upvote; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.reply_upvote (
    user_id bigint NOT NULL,
    reply_id bigint NOT NULL
);


ALTER TABLE public.reply_upvote OWNER TO neondb_owner;

--
-- TOC entry 219 (class 1259 OID 24576)
-- Name: test; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.test (
    name character varying(255)
);


ALTER TABLE public.test OWNER TO neondb_owner;

--
-- TOC entry 251 (class 1259 OID 196665)
-- Name: thread_downvote; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.thread_downvote (
    user_id bigint NOT NULL,
    thread_id bigint NOT NULL
);


ALTER TABLE public.thread_downvote OWNER TO neondb_owner;

--
-- TOC entry 250 (class 1259 OID 196646)
-- Name: thread_upvote; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.thread_upvote (
    user_id bigint NOT NULL,
    thread_id bigint NOT NULL
);


ALTER TABLE public.thread_upvote OWNER TO neondb_owner;

--
-- TOC entry 237 (class 1259 OID 139265)
-- Name: threads; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.threads (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    module_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    image_url text,
    body text,
    upvote integer DEFAULT 0,
    downvote integer DEFAULT 0,
    category character varying(255) NOT NULL,
    week integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    replies integer DEFAULT 0
);


ALTER TABLE public.threads OWNER TO neondb_owner;

--
-- TOC entry 236 (class 1259 OID 139264)
-- Name: threads_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.threads ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.threads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 40963)
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(30),
    first_name character varying(30) NOT NULL,
    last_name character varying(30),
    password_hash character varying(255) NOT NULL,
    nationality character varying(40),
    year character varying(40),
    faculty character varying(40),
    major character varying(40),
    residence character varying(40),
    bio text,
    friends integer DEFAULT 0,
    new_post integer DEFAULT '-1'::integer,
    new_thread integer DEFAULT 0,
    pfp_url text,
    CONSTRAINT users_friends_nonnegative CHECK ((friends >= 0))
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- TOC entry 220 (class 1259 OID 40962)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3386 (class 2604 OID 180245)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3384 (class 2604 OID 180228)
-- Name: listings id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.listings ALTER COLUMN id SET DEFAULT nextval('public.listings_id_seq'::regclass);


--
-- TOC entry 3684 (class 0 OID 180242)
-- Dependencies: 247
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.categories (id, name) FROM stdin;
1	Books & Notes
2	Electronics
3	Laptops & Computers
4	Phones & Tablets
5	Clothing & Shoes
6	Bags & Accessories
7	Furniture
8	Dorm Essentials
9	Kitchen & Appliances
10	Sports & Fitness
11	Musical Instruments
12	Games & Entertainment
13	Art & Craft Supplies
14	Stationery & Office Supplies
15	Bicycles & Scooters
16	Beauty & Personal Care
17	Health & Medical Supplies
18	Free Items
19	Services
20	Others
\.


--
-- TOC entry 3662 (class 0 OID 40990)
-- Dependencies: 225
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.comments (id, post_id, user_id, content) FROM stdin;
11	1	1	Dylan aaaaaa
12	1	1	Tolong aaaa
13	1	1	Adawdawd
14	1	1	Tolonggg
15	1	1	Woyy
16	1	19	Gw comment ama like nih hehe
17	1	1	uwawwwadawdawd
18	1	1	umagandang
19	1	19	Woy gw yang comment nih
21	1	19	Gw comment lagi
22	1	9	Keren
26	37	19	All the best Jasmine!
27	34	89	Your post is wonderful
28	42	91	I agree
29	42	92	agreed
30	43	36	testes
31	43	19	Ofcc
32	30	19	Anjayy tompelnya ganteng bang
33	29	19	Test
34	29	19	Test again
\.


--
-- TOC entry 3669 (class 0 OID 122911)
-- Dependencies: 232
-- Data for Name: conversation_members; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.conversation_members (conversation_id, user_id, role, joined_at, last_read_message_id) FROM stdin;
1	22	member	2026-06-25 05:02:35.607022+00	\N
1	89	member	2026-06-25 05:02:35.607022+00	\N
2	22	member	2026-06-25 05:02:44.484153+00	\N
2	89	member	2026-06-25 05:02:44.484153+00	\N
3	22	member	2026-06-25 05:03:50.83681+00	\N
3	89	member	2026-06-25 05:03:50.83681+00	\N
4	22	member	2026-06-25 05:04:29.720761+00	\N
4	89	member	2026-06-25 05:04:29.720761+00	\N
5	22	member	2026-06-25 05:05:34.241791+00	\N
5	89	member	2026-06-25 05:05:34.241791+00	\N
6	36	member	2026-06-25 17:05:26.127629+00	\N
6	22	member	2026-06-25 17:05:26.127629+00	\N
7	36	member	2026-06-26 04:02:34.29792+00	\N
7	89	member	2026-06-26 04:02:34.29792+00	\N
8	90	member	2026-06-28 10:14:25.620083+00	\N
8	22	member	2026-06-28 10:14:25.620083+00	\N
9	91	member	2026-07-04 15:46:55.943433+00	\N
9	36	member	2026-07-04 15:46:55.943433+00	\N
10	9	member	2026-07-07 11:59:20.445337+00	\N
10	19	member	2026-07-07 11:59:20.445337+00	\N
11	90	member	2026-07-11 10:10:25.521765+00	\N
11	89	member	2026-07-11 10:10:25.521765+00	\N
12	36	member	2026-07-11 11:20:13.965081+00	\N
12	90	member	2026-07-11 11:20:13.965081+00	\N
\.


--
-- TOC entry 3678 (class 0 OID 163841)
-- Dependencies: 241
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.conversations (id, user1_id, user2_id, created_at) FROM stdin;
1	36	90	2026-07-17 02:28:20.615453+00
2	89	90	2026-07-17 03:21:53.018096+00
\.


--
-- TOC entry 3665 (class 0 OID 41033)
-- Dependencies: 228
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.events (id, user_id, title, description, location, start_time, url) FROM stdin;
14	22	'Hack&Roll 2026	'Hack&Roll is the National University of Singapore School of Computing''s annual student-organised hackathon. Participants collaborate in teams over 24 hours to design and develop innovative software solutions while networking with industry professionals through workshops, mentoring sessions, and exciting challenges.	School of Computing, COM3	2026-09-19 01:00:00	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/event-images/1782631419376-event-image.jpg
15	22	ICPC Asia Regional Contest 2026	The ICPC Asia Regional Contest is a competitive programming event where teams of three solve challenging algorithmic problems under time pressure. Participants demonstrate problem-solving, teamwork, and coding skills in a high-energy contest environment.	'NUS School of Computing, COM1 Programming Labs	2026-11-03 02:00:00	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/event-images/1782631702035-event-image.jpg
16	22	NUS Open House 2027	Experience life at the National University of Singapore during NUS Open House 2027. Explore academic programmes, attend faculty talks, tour University Town and campus facilities, meet current students and professors, participate in interactive workshops, and discover student clubs, overseas opportunities, scholarships, and career pathways. The event is open to prospective students, parents, and members of the public.	University Town	2027-01-25 01:30:00	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/event-images/1782632046485-event-image.jpg
18	90	NUS Supernova 2026	Event will be held on week 0	UTown green	2026-08-09 11:00:00	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/event-images/1782663005975-event-image.jpg
19	90	NUS SuperNova	Join us with thousands of NUS Students	UTown Green	2026-08-08 04:12:00	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/event-images/1784256600154-event-image.jpg
\.


--
-- TOC entry 3666 (class 0 OID 41046)
-- Dependencies: 229
-- Data for Name: events_attendance; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.events_attendance (event_id, user_id) FROM stdin;
18	90
18	19
\.


--
-- TOC entry 3668 (class 0 OID 73747)
-- Dependencies: 231
-- Data for Name: friend_requests; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.friend_requests (sender_id, receiver_id, created_at) FROM stdin;
19	36	2026-06-22 11:28:17.338895+00
19	81	2026-06-23 10:54:59.361855+00
19	80	2026-06-23 10:55:08.719472+00
19	62	2026-06-23 10:55:17.437314+00
19	53	2026-06-23 10:55:27.476798+00
19	55	2026-06-23 10:55:37.954489+00
19	61	2026-06-23 10:55:46.654722+00
19	60	2026-06-23 10:56:10.742629+00
89	53	2026-06-23 20:40:45.511111+00
19	22	2026-06-27 15:02:53.758163+00
91	36	2026-07-04 15:46:01.855572+00
91	89	2026-07-04 15:46:15.293579+00
19	92	2026-07-07 12:01:11.53175+00
19	91	2026-07-07 12:01:16.681369+00
\.


--
-- TOC entry 3667 (class 0 OID 73728)
-- Dependencies: 230
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.friends (user1_id, user2_id) FROM stdin;
36	37
36	38
36	43
9	19
36	46
36	52
37	39
1	9
37	44
37	47
37	53
38	39
38	42
38	45
38	48
38	54
39	43
39	49
39	55
42	43
42	46
42	52
42	58
43	44
43	47
43	53
43	59
44	45
44	48
44	54
44	60
45	46
45	49
45	55
45	61
46	47
46	50
46	56
46	62
47	48
47	51
47	57
47	63
48	49
48	52
48	58
48	64
49	50
49	53
49	59
49	65
50	51
50	54
50	60
50	66
51	52
51	55
51	61
51	67
52	53
52	56
52	62
52	68
53	54
53	57
53	63
53	69
54	55
54	58
54	64
54	70
55	56
55	59
55	65
55	71
56	57
56	60
56	66
56	72
57	58
57	61
57	67
57	73
58	59
58	62
58	68
58	74
59	60
59	63
59	69
59	75
60	61
60	64
60	70
60	76
61	62
61	65
61	71
61	77
62	63
62	66
62	72
62	78
63	64
63	67
63	73
63	79
64	65
64	68
64	74
64	80
65	66
65	69
65	75
65	81
66	67
66	70
66	76
66	82
67	68
67	71
67	77
67	83
68	69
68	72
68	78
68	84
69	70
69	73
69	79
69	85
70	71
70	74
70	80
71	72
71	75
71	81
72	73
72	76
72	82
73	74
73	77
73	83
74	75
74	78
74	84
75	76
75	79
75	85
76	77
76	80
77	78
77	81
78	79
78	82
79	80
79	83
80	81
80	84
81	82
81	85
82	83
83	84
84	85
\.


--
-- TOC entry 3663 (class 0 OID 41013)
-- Dependencies: 226
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.likes (user_id, post_id) FROM stdin;
39	30
80	31
62	32
53	36
9	30
89	34
22	39
89	39
91	39
91	42
92	42
19	43
19	42
19	38
36	34
19	35
19	29
19	30
19	1
9	1
1	1
36	31
37	31
38	31
39	31
42	31
43	31
44	31
45	31
46	31
47	31
48	31
49	31
50	31
51	31
52	31
53	31
54	31
55	31
36	32
38	32
42	32
44	32
46	32
48	32
50	32
52	32
54	32
56	32
58	32
60	32
64	32
37	33
38	33
39	33
42	33
43	33
44	33
45	33
46	33
47	33
48	33
49	33
50	33
51	33
52	33
53	33
54	33
55	33
56	33
57	33
58	33
59	33
60	33
61	33
62	33
63	33
64	33
65	34
66	34
67	34
68	34
69	34
70	34
71	34
72	34
73	34
74	34
75	34
76	34
36	35
39	35
42	35
45	35
48	35
51	35
54	35
57	35
60	35
63	35
66	35
69	35
72	35
75	35
78	35
81	35
84	35
37	35
43	35
46	35
49	35
52	35
55	35
58	35
50	36
51	36
52	36
54	36
55	36
56	36
57	36
58	36
59	36
60	36
61	36
62	36
63	36
64	36
65	36
66	36
67	36
36	37
37	37
38	37
39	37
42	37
43	37
44	37
45	37
46	37
47	37
48	37
49	37
50	37
51	37
52	37
53	37
54	37
55	37
56	37
57	37
58	37
59	37
60	37
61	37
62	37
63	37
64	37
65	37
89	38
\.


--
-- TOC entry 3682 (class 0 OID 180225)
-- Dependencies: 245
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.listings (id, seller_id, title, description, price, image_url, created_at, category_id) FROM stdin;
1	90	tes123	tes123	1.00	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1784714213952-listing-image.jpg	2026-07-22 09:56:54.896871+00	\N
2	90	tes123	tes123	1.00	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1784714294506-listing-image.jpg	2026-07-22 09:58:14.906667+00	\N
51	1	Calculus Textbook	Calculus: Early Transcendentals, 9th edition. Like new.	35.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	1
52	1	Mechanical Keyboard	Keychron K2 wireless mechanical keyboard with brown switches.	60.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	2
53	1	Dell XPS 13	Intel i7, 16GB RAM, 512GB SSD. Excellent condition.	700.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	3
54	1	iPhone 13	128GB Midnight. Includes original charger and case.	500.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	4
55	92	Uniqlo Hoodie	Grey hoodie, size M. Worn only a few times.	20.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	5
56	92	Study Desk	Wooden desk with drawer. Perfect for dorm rooms.	45.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	6
57	92	Desk Lamp	LED desk lamp with adjustable brightness.	15.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	7
58	52	Rice Cooker	1.8L rice cooker. Works perfectly.	30.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	8
59	52	Badminton Racket	Yonex racket with carrying case.	40.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	9
60	62	Noise Cancelling Headphones	Sony WH-1000XM4 in good condition.	180.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	2
61	62	Organic Chemistry Notes	Complete handwritten notes for Organic Chemistry.	10.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	1
62	63	Mini Whiteboard	Small whiteboard for studying and planning.	8.00	/post-dummy.png	2026-07-23 14:34:51.026811+00	10
\.


--
-- TOC entry 3680 (class 0 OID 163865)
-- Dependencies: 243
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.messages (id, conversation_id, sender_id, content, created_at) FROM stdin;
1	1	90	HALOHALO	2026-07-17 10:04:12.399349+00
2	1	90	HAlo calvin	2026-07-17 11:15:58.32716+00
3	1	36	Halo calvin4	2026-07-17 11:17:29.992205+00
4	1	90	halo	2026-07-17 11:43:41.425504+00
5	1	90	halo	2026-07-17 11:43:50.78868+00
6	1	90	halo	2026-07-17 11:43:54.574995+00
7	1	90	halo	2026-07-17 11:43:57.994023+00
8	2	90	Halo bang	2026-07-17 11:47:15.22624+00
9	1	90	GImana kabarmu	2026-07-17 13:28:56.458433+00
10	1	36	Baik calvin	2026-07-17 13:29:34.61071+00
11	1	90	tes	2026-07-17 13:29:49.583179+00
12	1	90	tes	2026-07-17 13:29:51.697795+00
13	1	90	tes	2026-07-17 13:29:54.623445+00
14	1	90	tes	2026-07-17 13:29:57.415034+00
15	1	90	Halo calvin	2026-07-17 16:05:02.234129+00
16	1	90	Gimana kabarmu	2026-07-17 16:05:15.299984+00
17	1	90	Halo bang	2026-07-17 16:06:18.891483+00
18	1	90	Halo calvin3	2026-07-17 16:10:44.461385+00
19	1	36	Halo calvin4	2026-07-17 16:11:56.612616+00
20	1	90	Adek suka kentut	2026-07-17 16:22:36.538831+00
21	1	90	Adek suka kentut	2026-07-17 16:23:08.991291+00
22	1	90	Adek jelek	2026-07-17 16:23:16.240641+00
23	1	36	berak	2026-07-17 16:23:20.621149+00
24	1	36	SLCYDDDDDDDDD	2026-07-17 16:23:33.890643+00
25	1	90	qhioihioihioiqwheigoiqwehg	2026-07-17 16:23:50.170247+00
26	1	36	org schizo ngomong ama dirinya sendiri amit amit	2026-07-17 16:23:56.23962+00
27	1	90	NGOMONG APA ITU	2026-07-17 16:23:58.030659+00
28	1	90	APASIH APSIH APHSIHASPIODH OASDHIOAP DOISHIDOAPOIDHIASOP DOIAHS IOPAOISDHIOASPDO IHA ISOPDOIH I HAISH DIAH IH ISAHI ASHI HASI HASIDH IASHIDHASI HI HDAISH IHIDASHI HASDIH IASH IHADI HASII ASHI HASIHASIH IASHI HASDIH	2026-07-17 16:24:20.228624+00
29	1	36	selden li kuper yu daekk	2026-07-17 16:24:22.304747+00
30	1	36		2026-07-17 16:24:24.398421+00
31	1	36	ap si gaje	2026-07-17 16:24:28.566414+00
32	1	36	tes	2026-07-18 03:15:14.172813+00
\.


--
-- TOC entry 3671 (class 0 OID 131073)
-- Dependencies: 234
-- Data for Name: modules; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.modules (id, title, atendees, banner_url) FROM stdin;
5	CS1101S	0	
6	CS2100	0	
7	CS2102	0	
8	MA1521	0	
9	MA1522	0	
4	CS2040S	1	
2	CS2030S	2	
\.


--
-- TOC entry 3672 (class 0 OID 131079)
-- Dependencies: 235
-- Data for Name: modules_attendance; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.modules_attendance (user_id, module_id) FROM stdin;
19	2
\.


--
-- TOC entry 3660 (class 0 OID 40974)
-- Dependencies: 223
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.posts (id, user_id, url, caption, likes, comments, created_at) FROM stdin;
35	55	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782211439443-post-image.jpg	Started with "just one more practice question" and somehow ended up at UTown at 1:30am.\r\n\r\nNo regrets.\r\n\r\n#UTown #SupperGang #NUSLife	26	0	2026-06-23 10:43:58.39209+00
30	19	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782198535599-post-image.jpg	Should I audition for this year's Supernova 🤔	3	1	2026-06-23 07:08:56.131948+00
29	19	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782198415331-post-image.jpg	National Gallery vibes	1	2	2026-06-23 07:06:55.63124+00
1	1	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1781980783161-post-image.jpg	Just graduated!	3	11	2026-06-19 19:04:21.639255+00
34	53	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782211388839-post-image.jpg	"I'll study for 2 hours."\r\n\r\nProceeds to spend 45 minutes choosing Spotify playlists.\r\n\r\n#UTownStarbucks #StudentLife #NUS	14	1	2026-06-23 10:43:07.814854+00
31	81	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782211128280-post-image.jpg	Crazy how the strangers I met during orientation became some of my closest friends.\r\n\r\nBest decision I made this year.\r\n\r\n#ShearesHall #HallLife #NUSOrientation	21	0	2026-06-23 10:38:48.154623+00
33	62	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782211265093-post-image.jpg	Legs are gone.\r\n\r\nCoach says "one last drill" at least 7 times every training.\r\n\r\n#NUSBasketball #USC #StudentAthlete	28	0	2026-06-23 10:41:04.095445+00
32	80	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782211210996-post-image.jpg	30 hours.\r\n\r\n4 cups of coffee.\r\n\r\n2 hours of sleep.\r\n\r\n1 functioning prototype.\r\n\r\nWorth it.\r\n\r\n#Hackathon #NUSComputing #BuildSomething	15	0	2026-06-23 10:40:09.800267+00
36	61	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782211484267-post-image.jpg	Some days NUS stress is crazy.\r\n\r\nOther days you get sunsets like this and everything feels okay again.\r\n\r\n#TembusuCollege #UTown #NUS	18	0	2026-06-23 10:44:43.101464+00
43	92	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1783234784193-post-image.jpg	anyone likes cats	1	2	2026-07-05 06:59:44.435776+00
37	53	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782211597144-post-image.jpg	Day 4 of camping at CLB. I think I've spent more time here than in my room this week 💀\r\n\r\nCS2040 finals tomorrow. If anyone sees me talking to my laptop, mind your business.\r\n\r\n#NUS #FinalsWeek #CLB	30	1	2026-06-23 10:46:36.444034+00
39	22	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782282607467-post-image.jpg	EG1311 Cad Modelling - We finally completed our test run.	3	0	2026-06-24 06:30:07.818889+00
42	91	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1783179886514-post-image.jpg	Orange juice is cool	3	2	2026-07-04 15:44:47.270043+00
38	89	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782247303127-post-image.jpg	Sunset at NUS	2	0	2026-06-23 20:41:43.366988+00
\.


--
-- TOC entry 3676 (class 0 OID 147457)
-- Dependencies: 239
-- Data for Name: replies; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.replies (id, user_id, module_id, thread_id, parent_reply_id, body, upvote, downvote, created_at) FROM stdin;
2	19	2	4	1	YESSS!	0	0	2026-07-13 02:26:18.737083
4	1	2	5	\N	Yess??	0	0	2026-07-21 11:19:24.342528
7	19	2	4	6	Test	0	0	2026-07-21 11:47:37.498742
10	19	2	10	\N	Hahaa good	0	0	2026-07-21 20:07:23.930351
11	19	2	10	\N	What	0	0	2026-07-21 20:10:54.751443
12	19	2	10	\N	Hehe	0	0	2026-07-21 20:13:06.324127
13	19	2	10	\N	Yess	0	0	2026-07-21 20:14:04.697692
14	19	2	10	\N	Yooo, sick	0	0	2026-07-21 20:15:29.592623
15	19	2	10	14	Is it really that sick?	0	0	2026-07-21 20:20:56.144793
16	19	2	10	14	Wohoo	0	0	2026-07-21 20:24:31.681133
17	19	2	10	13	This is good	0	0	2026-07-21 20:24:38.754863
18	19	2	10	13	Wow	0	0	2026-07-21 20:25:06.355425
19	19	2	10	12	Wow	0	0	2026-07-21 20:25:11.372287
20	19	2	10	11	Yeahh	0	0	2026-07-21 20:26:32.602926
21	19	2	10	16	Hmmm	0	0	2026-07-21 20:26:42.794614
22	19	2	10	15	What\n	0	0	2026-07-21 20:31:00.421585
5	1	2	4	2	You used to cry while studying this tho...	0	0	2026-07-21 11:26:39.850009
6	19	2	4	\N	Second reply	0	0	2026-07-21 11:42:03.81143
1	1	2	4	\N	Really though?	0	0	2026-07-13 02:25:41.867615
23	19	2	4	\N	Yoo nicee	1	0	2026-07-22 10:47:28.874296
9	19	2	4	\N	Test	1	0	2026-07-21 19:58:01.4505
24	19	2	4	23	Woww	0	1	2026-07-22 16:26:07.390381
25	19	2	14	\N	Woww	1	0	2026-07-22 19:40:57.366082
8	1	2	4	\N	Okayy	1	0	2026-07-21 19:51:03.825418
26	19	2	4	8	HAHAAAA	0	0	2026-07-23 13:54:54.721264
27	19	2	12	\N		0	0	2026-07-23 19:23:58.729948
28	19	2	12	\N	Woy	0	0	2026-07-23 19:28:41.113562
29	19	2	12	\N	Test	0	0	2026-07-23 19:30:06.936282
31	19	2	12	30	Test	0	0	2026-07-23 19:30:58.536334
32	19	2	14	25	Wadaw	0	0	2026-07-23 19:31:17.028625
33	19	2	14	32	Wadaw	0	0	2026-07-23 19:31:20.412873
30	19	2	12	29	Hahaa	1	0	2026-07-23 19:30:12.137933
\.


--
-- TOC entry 3686 (class 0 OID 196627)
-- Dependencies: 249
-- Data for Name: reply_downvote; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.reply_downvote (user_id, reply_id) FROM stdin;
19	24
\.


--
-- TOC entry 3685 (class 0 OID 196608)
-- Dependencies: 248
-- Data for Name: reply_upvote; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.reply_upvote (user_id, reply_id) FROM stdin;
19	23
19	9
19	25
19	8
19	30
\.


--
-- TOC entry 3656 (class 0 OID 24576)
-- Dependencies: 219
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.test (name) FROM stdin;
You have been logged in and the DB has been connected
\.


--
-- TOC entry 3688 (class 0 OID 196665)
-- Dependencies: 251
-- Data for Name: thread_downvote; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.thread_downvote (user_id, thread_id) FROM stdin;
19	14
\.


--
-- TOC entry 3687 (class 0 OID 196646)
-- Dependencies: 250
-- Data for Name: thread_upvote; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.thread_upvote (user_id, thread_id) FROM stdin;
19	4
19	13
19	12
19	22
\.


--
-- TOC entry 3674 (class 0 OID 139265)
-- Dependencies: 237
-- Data for Name: threads; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.threads (id, user_id, module_id, title, image_url, body, upvote, downvote, category, week, created_at, replies) FROM stdin;
14	19	2	Another thread	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/modules-images/1784749221098-post-image.jpg	test	0	1	General	7	2026-07-22 19:40:23.089225	3
23	19	2	Test	\N	ss	0	0	Exam	0	2026-07-23 19:32:12.918314	0
11	19	2	Join NUS ISCF yaa gess	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/modules-images/1784748303252-post-image.jpg	PLSSSS	0	0	General	1	2026-07-22 19:25:05.862825	0
13	19	5	How's you guys week going?	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/modules-images/1784748969531-post-image.jpg	Anyways, this is the real logo of NUSphere	1	0	General	3	2026-07-22 19:36:11.258971	0
15	19	2	This week's lecture quite hard eee	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/modules-images/1784799112676-post-image.jpg	SOOOO HARDDDD	0	0	Lecture	0	2026-07-23 09:31:54.629501	0
16	19	2	Testbang	\N	egege	0	0	General	0	2026-07-23 09:41:48.623092	0
19	19	2	Bang	\N	Test	0	0	General	0	2026-07-23 09:51:55.547192	0
20	19	2	I don't get it	\N	awdad	0	0	General	2	2026-07-23 10:02:21.040901	0
4	19	2	CS2030S is the best mod ever	\N	\N	1	0	General	0	2026-07-13 02:24:23.487704	10
21	19	2	Test from development	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/modules-images/1784825366705-post-image.jpg	adawdad	0	0	Tutorial	0	2026-07-23 16:49:27.122698	0
22	19	2	Test from Production	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/modules-images/1784825902917-post-image.jpg	Hahaha	1	0	Tutorial	0	2026-07-23 16:58:23.261339	0
12	19	2	Please join PGPR Bandd	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/modules-images/1784748622445-post-image.jpg	PLSSSS	1	0	General	7	2026-07-22 19:30:24.361945	5
5	1	2	Anybody has ever heard of inheritane before	\N	\N	0	0	Lecture	2	2026-07-15 19:20:25.09961	1
10	19	2	This week tutorial is Nuts	\N	\N	0	0	Tutorial	2	2026-07-15 19:22:44.865457	13
\.


--
-- TOC entry 3658 (class 0 OID 40963)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, first_name, last_name, password_hash, nationality, year, faculty, major, residence, bio, friends, new_post, new_thread, pfp_url) FROM stdin;
1	TestUser	Jamie	Chang	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore PR	Undergraduate Y2	Dentistry	Architecture	Cendana College	Test User is a good boy	1	-1	-1	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/profile-images/IG%20pfp.jpg
92	Anson123	Anson	Test	$2b$10$N0Xsfgz/xh3IBAC94h3mkewRQuEJi.Da5YGZ4WCSf44zPTY5MsrCW	Singapore Citizen	Undergraduate Y2	School of Computing	Chinese Studies	College of Alice & Peter Tan	Hi i like cats!	0	-1	-1	\N
52	sarahong	Sarah	Ong	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y4	Law	Law	Kent Ridge Hall	Interested in corporate law.	8	-1	-1	\N
62	yuxuanlee	Yu Xuan	Lee	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	School of Computing	Information Security	Acacia College	Cybersecurity and CTF competitions.	8	-1	-1	\N
63	kaiwenlim	Kai Wen	Lim	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y1	Design and Engineering	Computer Engineering	Kent Ridge Hall	Love hardware and software equally.	8	-1	-1	\N
36	calvinpandiangan3	Calvin	Pandiangan	$2b$10$7le2g2FNzNV79mWNXaVOAOXeOOfRW8SKQOSAng2271wvJPxta0eCe	Indonesian	Undergraduate Y2	School of Computing	Computer Science	Prince George's Park Residence	Im a pro	6	-1	-1	\N
78	desmondtan	Desmond	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y4	Design and Engineering	Civil Engineering	Kent Ridge Hall	Infrastructure and urban planning.	6	-1	-1	\N
79	jeremylim	Jeremy	Lim	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	Business School	Finance	Temasek Hall	Interested in venture capital.	6	-1	-1	\N
80	darrenkoh	Darren	Koh	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Australian	Exchange	School of Computing	Computer Science	UTown Residence	Tech and travel enthusiast.	6	-1	-1	\N
81	gabriellee	Gabriel	Lee	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y1	Humanities and Sciences	Economics	Elm College	Economics, football, and coffee.	6	-1	-1	\N
82	isaactan	Isaac	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y3	School of Computing	Artificial Intelligence	Helix House	Building AI products and learning every day.	5	-1	-1	\N
83	marcuslim	Marcus	Lim	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	Business School	Business Administration	Raffles Hall	Leadership and entrepreneurship.	5	-1	-1	\N
84	timothykoh	Timothy	Koh	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y4	School of Computing	Information Security	Sheares Hall	Cybersecurity and ethical hacking.	5	-1	-1	\N
85	shawnong	Shawn	Ong	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y1	Design and Engineering	Robotics and Machine Intelligence	Acacia College	Robots are cooler than humans.	4	-1	-1	\N
86	brandonlee	Brandon	Lee	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	School of Computing	Computer Science	Tembusu College	Looking for coding buddies and startup founders.	0	-1	-1	\N
23	TestUser1	test	user	$2b$10$SvdywiL2syK0nrjeQA77UeYe5VbmbhK2oAYMTypn3QAJzQXrQ0hTW	\N	\N	\N	\N	\N	\N	0	-1	-1	\N
42	seanlee	Sean	Lee	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y1	School of Computing	Information Systems	LightHouse	Building cool things one bug at a time.	6	-1	-1	\N
43	aarontoh	Aaron	Toh	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Chinese	Exchange	Business School	Business Analytics	Prince George's Park Residence	Exchange student exploring Singapore.	7	-1	-1	\N
9	TestAgain	Test	Again	$2b$10$1lCHwn9jc6blwThrA4HWQOj8tGeA2uhNEoSclnp6Csmb5DWRMaI2W	Malaysian	Undergraduate Y3	Design and Engineering	Anthropology	College of Alice & Peter Tan	\N	2	-1	-1	\N
54	cherietan	Cherie	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Filipino	Undergraduate Y3	Public Health	Pharmacy	Prince George's Park Residence	Healthcare and community outreach.	8	-1	-1	\N
71	claratan	Clara	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Vietnamese	Exchange	Business School	Business Administration	UTown Residence	Exploring Singapore and making friends.	7	-1	-1	\N
72	joannalee	Joanna	Lee	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y3	School of Computing	Computer Science	Acacia College	Full-stack development and design.	7	-1	-1	\N
44	nicholaskoh	Nicholas	Koh	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y3	School of Computing	Computer Engineering	Sheares Hall	Tech, basketball, and late-night coding.	7	-1	-1	\N
22	calvinpandiangan	calvin	pandiangan	$2b$10$JOpHNxltA8HimKsx9Rg66OZzZFclBG1PTxWHVXlBYCdKUpP1ffDuy	Indonesian	Undergraduate Y2	School of Computing	Computer Science	Prince George's Park Residence	\N	0	-1	-1	\N
67	xinyikoh	Xin Yi	Koh	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Malaysian	Undergraduate Y3	School of Computing	Data Science and Analytics	UTown Residence	Machine learning and photography.	8	-1	-1	\N
69	shuyinglim	Shu Ying	Lim	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	Humanities and Sciences	Geography	Saga College	Maps, travel, and food.	8	-1	-1	\N
70	jingwenong	Jing Wen	Ong	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y4	Public Policy	Philosophy, Politics and Economics	Tembusu College	Public policy and governance.	7	-1	-1	\N
91	gabriellegtw	Gabrielle	Tan	$2b$10$eyc7mYZyTfcX6BaR1zBd/OJim2hkQB3MFEH4eNzT0DGI8jfIp13JG	Singapore Citizen	Undergraduate Y4	School of Computing	Computer Science	Tembusu College	I love NUSphere	0	-1	-1	\N
38	ryanlim	Ryan	Lim	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y3	Business School	Finance	Raffles Hall	Coffee addict and finance enthusiast.	6	-1	-1	\N
39	benjaminng	Benjamin	Ng	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore PR	Undergraduate Y1	School of Computing	Artificial Intelligence	College of Alice & Peter Tan	Interested in AI and startups.	6	-1	-1	\N
49	amandatan	Amanda	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y3	Business School	Finance	Raffles Hall	Love networking and meeting new people.	7	-1	-1	\N
93	lolboy	lol	boy	$2b$10$g5KCNPiM9Ofoioi4ljy6.ejFq21S7CjXzlAlM0czo.nVoEIM/9T32	\N	\N	\N	\N	\N	\N	0	-1	-1	\N
90	calvinpandiangan4	Calvin	Pandiangan	$2b$10$.H.vKvvRG74mBropcQmIQORBP7lqnrq.Wl/b25qMCOvD8s2Bvhmfi	Singapore PR	Undergraduate Y1	Business School	Anthropology	Acacia College	1	0	-1	-1	\N
37	ethantan	Ethan	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	School of Computing	Computer Science	Tembusu College	Always looking for teammates for hackathons and side projects.	6	-1	-1	\N
64	yiqingtan	Yi Qing	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Chinese	Exchange	Humanities and Sciences	Economics	UTown Residence	Exchange student passionate about economics.	8	-1	-1	\N
65	huiminng	Hui Min	Ng	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y4	School of Medicine	Medicine	King Edward VII Hall	Trying to balance medicine and sleep.	8	-1	-1	\N
66	peiyilee	Pei Yi	Lee	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	Business School	Finance	Cendana College	Stocks, coffee, and gym.	8	-1	-1	\N
68	meilingtan	Mei Ling	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y1	Humanities and Sciences	English Literature	Helix House	Book lover and writer.	8	-1	-1	\N
26	ryanang	Ryan	Ang	$2b$10$H9IkJOZQC8Aa7KiRRw4m2uBL3eHc9qakUYM1.bdlZw0ss8q0GX96m	\N	\N	\N	\N	\N	\N	0	-1	-1	\N
45	jonathanong	Jonathan	Ong	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore PR	Undergraduate Y2	Humanities and Sciences	Psychology	Saga College	Interested in human behaviour and design.	7	-1	-1	\N
46	kevintan	Kevin	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Indonesian	Undergraduate Y4	Business School	Business Administration	Temasek Hall	Entrepreneurship and investing.	7	-1	-1	\N
56	natalietan	Natalie	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y1	Humanities and Sciences	History	Helix House	Museums and history documentaries.	8	-1	-1	\N
57	weijietan	Wei Jie	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y3	School of Computing	Computer Science	Sheares Hall	Backend developer and basketball player.	8	-1	-1	\N
50	gracekoh	Grace	Koh	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore PR	Undergraduate Y2	Humanities and Sciences	Sociology	UTown Residence	Exploring society one conversation at a time.	7	-1	-1	\N
51	michellelim	Michelle	Lim	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Malaysian	Undergraduate Y1	School of Computing	Data Science and Analytics	LightHouse	Data nerd and bubble tea fan.	7	-1	-1	\N
73	audreylim	Audrey	Lim	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	Business School	Business Analytics	Raffles Hall	Consulting and case competitions.	7	-1	-1	\N
74	vanessatan	Vanessa	Tan	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore PR	Postgraduate	NUS Graduate School	Quantitative Finance	UTown Residence	Quantitative finance researcher.	7	-1	-1	\N
75	nicolekoh	Nicole	Koh	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y1	Humanities and Sciences	Political Science	Cendana College	Politics and international affairs.	7	-1	-1	\N
53	jasminelee	Jasmine	Lee	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	Music	Music	Tembusu College	Pianist and worship team member.	8	-1	-1	\N
58	junhaolim	Jun Hao	Lim	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	Design and Engineering	Electrical Engineering	Temasek Hall	Robotics and embedded systems.	8	-1	-1	\N
59	zhixuanng	Zhi Xuan	Ng	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y1	School of Computing	Artificial Intelligence	Elm College	AI enthusiast and chess player.	8	-1	-1	\N
60	jianhaokoh	Jian Hao	Koh	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore PR	Undergraduate Y4	Business School	Business Analytics	Raffles Hall	Analytics, startups, and football.	8	-1	-1	\N
61	mingyuong	Ming Yu	Ong	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y3	Humanities and Sciences	Psychology	Ridge View Residential College	Interested in behavioural science.	8	-1	-1	\N
47	charlottelee	Charlotte	Lee	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y2	Humanities and Sciences	Political Science	Tembusu College	Debates, books, and public policy.	7	-1	-1	\N
48	rachelng	Rachel	Ng	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y1	School of Medicine	Medicine	College of Alice & Peter Tan	Future doctor trying to survive med school.	7	-1	-1	\N
55	olivialim	Olivia	Lim	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Australian	Exchange	Business School	Business Administration	UTown Residence	Exchange student and travel lover.	8	-1	-1	\N
24	AnotherUser	Test	User	$2b$10$ahv5/7La6WCFqOITiKdiVeH/bXjZW9Qyh9UKFGVtcpkMVsdLuyKP6	Singapore PR	Undergraduate Y4	School of Computing	Artificial Intelligence	Cendana College	\N	0	-1	-1	\N
19	_valentino_nathan_	Valentino	Nathan	$2b$10$PS8tcJrnpyKgX5XDDp1HYuAKY0U3owIsEmsoTXM.MVrQJsAd76BBW	Indonesian	Undergraduate Y2	School of Computing	Computer Science	Prince George's Park Residence	This is my bio	1	-1	-1	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/profile-images/IG%20pfp.jpg
89	valentinonathan	Valentino	Nathan	$2b$10$1quAT3mm64Nc0dCLBUzSCuMDVawKmFsVNPmLl5RVKoA5uhT6rvMz6	Indonesian	Undergraduate Y2	School of Computing	Computer Science	Pioneer House	My name is Valentino	0	-1	-1	\N
76	samanthalee	Samantha	Lee	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	American	Exchange	School of Computing	Information Systems	UTown Residence	Exchange student who loves tech.	6	-1	-1	\N
77	alvinng	Alvin	Ng	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore Citizen	Undergraduate Y3	School of Computing	Computer Science	Sheares Hall	Competitive programmer and gamer.	6	-1	-1	\N
\.


--
-- TOC entry 3698 (class 0 OID 0)
-- Dependencies: 246
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.categories_id_seq', 20, true);


--
-- TOC entry 3699 (class 0 OID 0)
-- Dependencies: 224
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.comments_id_seq', 34, true);


--
-- TOC entry 3700 (class 0 OID 0)
-- Dependencies: 240
-- Name: conversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.conversations_id_seq', 2, true);


--
-- TOC entry 3701 (class 0 OID 0)
-- Dependencies: 227
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.events_id_seq', 19, true);


--
-- TOC entry 3702 (class 0 OID 0)
-- Dependencies: 244
-- Name: listings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.listings_id_seq', 62, true);


--
-- TOC entry 3703 (class 0 OID 0)
-- Dependencies: 242
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.messages_id_seq', 32, true);


--
-- TOC entry 3704 (class 0 OID 0)
-- Dependencies: 233
-- Name: modules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.modules_id_seq', 9, true);


--
-- TOC entry 3705 (class 0 OID 0)
-- Dependencies: 222
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.posts_id_seq', 43, true);


--
-- TOC entry 3706 (class 0 OID 0)
-- Dependencies: 238
-- Name: replies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.replies_id_seq', 33, true);


--
-- TOC entry 3707 (class 0 OID 0)
-- Dependencies: 236
-- Name: threads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.threads_id_seq', 23, true);


--
-- TOC entry 3708 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 93, true);


--
-- TOC entry 3455 (class 2606 OID 180251)
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- TOC entry 3457 (class 2606 OID 180249)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3401 (class 2606 OID 40999)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3423 (class 2606 OID 122924)
-- Name: conversation_members conversation_members_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.conversation_members
    ADD CONSTRAINT conversation_members_pkey PRIMARY KEY (conversation_id, user_id);


--
-- TOC entry 3447 (class 2606 OID 163851)
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- TOC entry 3449 (class 2606 OID 163853)
-- Name: conversations conversations_user1_id_user2_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_user1_id_user2_id_key UNIQUE (user1_id, user2_id);


--
-- TOC entry 3412 (class 2606 OID 41052)
-- Name: events_attendance events_attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events_attendance
    ADD CONSTRAINT events_attendance_pkey PRIMARY KEY (event_id, user_id);


--
-- TOC entry 3409 (class 2606 OID 41039)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 3419 (class 2606 OID 73753)
-- Name: friend_requests friend_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_pkey PRIMARY KEY (sender_id, receiver_id);


--
-- TOC entry 3416 (class 2606 OID 73735)
-- Name: friends friends_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (user1_id, user2_id);


--
-- TOC entry 3407 (class 2606 OID 41019)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (post_id, user_id);


--
-- TOC entry 3453 (class 2606 OID 180235)
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (id);


--
-- TOC entry 3451 (class 2606 OID 163877)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3432 (class 2606 OID 131085)
-- Name: modules_attendance modules_attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.modules_attendance
    ADD CONSTRAINT modules_attendance_pkey PRIMARY KEY (user_id, module_id);


--
-- TOC entry 3426 (class 2606 OID 131078)
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (id);


--
-- TOC entry 3399 (class 2606 OID 40983)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 3445 (class 2606 OID 147471)
-- Name: replies replies_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_pkey PRIMARY KEY (id);


--
-- TOC entry 3465 (class 2606 OID 196633)
-- Name: reply_downvote reply_downvote_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reply_downvote
    ADD CONSTRAINT reply_downvote_pkey PRIMARY KEY (reply_id, user_id);


--
-- TOC entry 3461 (class 2606 OID 196614)
-- Name: reply_upvote reply_upvote_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reply_upvote
    ADD CONSTRAINT reply_upvote_pkey PRIMARY KEY (reply_id, user_id);


--
-- TOC entry 3473 (class 2606 OID 196671)
-- Name: thread_downvote thread_downvote_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.thread_downvote
    ADD CONSTRAINT thread_downvote_pkey PRIMARY KEY (thread_id, user_id);


--
-- TOC entry 3469 (class 2606 OID 196652)
-- Name: thread_upvote thread_upvote_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.thread_upvote
    ADD CONSTRAINT thread_upvote_pkey PRIMARY KEY (thread_id, user_id);


--
-- TOC entry 3439 (class 2606 OID 139275)
-- Name: threads threads_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.threads
    ADD CONSTRAINT threads_pkey PRIMARY KEY (id);


--
-- TOC entry 3414 (class 2606 OID 65537)
-- Name: events_attendance unique_event_attendance; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events_attendance
    ADD CONSTRAINT unique_event_attendance UNIQUE (event_id, user_id);


--
-- TOC entry 3428 (class 2606 OID 147516)
-- Name: modules unique_title; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT unique_title UNIQUE (title);


--
-- TOC entry 3394 (class 2606 OID 40970)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3396 (class 2606 OID 40972)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3402 (class 1259 OID 41012)
-- Name: idx_comments_post_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_comments_post_id ON public.comments USING btree (post_id);


--
-- TOC entry 3403 (class 1259 OID 41011)
-- Name: idx_comments_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_comments_user_id ON public.comments USING btree (user_id);


--
-- TOC entry 3424 (class 1259 OID 122962)
-- Name: idx_conversation_members_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_conversation_members_user ON public.conversation_members USING btree (user_id);


--
-- TOC entry 3410 (class 1259 OID 41045)
-- Name: idx_events_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_events_user_id ON public.events USING btree (user_id);


--
-- TOC entry 3420 (class 1259 OID 131099)
-- Name: idx_friend_requests_receiver_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_friend_requests_receiver_id ON public.friend_requests USING btree (receiver_id);


--
-- TOC entry 3421 (class 1259 OID 131098)
-- Name: idx_friend_requests_sender_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_friend_requests_sender_id ON public.friend_requests USING btree (sender_id);


--
-- TOC entry 3417 (class 1259 OID 73746)
-- Name: idx_friends_user2_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_friends_user2_id ON public.friends USING btree (user2_id);


--
-- TOC entry 3404 (class 1259 OID 41030)
-- Name: idx_likes_post_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_likes_post_id ON public.likes USING btree (post_id);


--
-- TOC entry 3405 (class 1259 OID 41031)
-- Name: idx_likes_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_likes_user_id ON public.likes USING btree (user_id);


--
-- TOC entry 3429 (class 1259 OID 131097)
-- Name: idx_modules_attendance_modules_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_modules_attendance_modules_id ON public.modules_attendance USING btree (module_id);


--
-- TOC entry 3430 (class 1259 OID 131096)
-- Name: idx_modules_attendance_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_modules_attendance_user_id ON public.modules_attendance USING btree (user_id);


--
-- TOC entry 3397 (class 1259 OID 41010)
-- Name: idx_posts_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_posts_user_id ON public.posts USING btree (user_id);


--
-- TOC entry 3440 (class 1259 OID 147493)
-- Name: idx_replies_module_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_replies_module_id ON public.replies USING btree (module_id);


--
-- TOC entry 3441 (class 1259 OID 147495)
-- Name: idx_replies_parent_reply_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_replies_parent_reply_id ON public.replies USING btree (parent_reply_id);


--
-- TOC entry 3442 (class 1259 OID 147494)
-- Name: idx_replies_thread_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_replies_thread_id ON public.replies USING btree (thread_id);


--
-- TOC entry 3443 (class 1259 OID 147492)
-- Name: idx_replies_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_replies_user_id ON public.replies USING btree (user_id);


--
-- TOC entry 3462 (class 1259 OID 196645)
-- Name: idx_reply_downvote_reply_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_reply_downvote_reply_id ON public.reply_downvote USING btree (reply_id);


--
-- TOC entry 3463 (class 1259 OID 196644)
-- Name: idx_reply_downvote_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_reply_downvote_user_id ON public.reply_downvote USING btree (user_id);


--
-- TOC entry 3458 (class 1259 OID 196626)
-- Name: idx_reply_upvote_reply_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_reply_upvote_reply_id ON public.reply_upvote USING btree (reply_id);


--
-- TOC entry 3459 (class 1259 OID 196625)
-- Name: idx_reply_upvote_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_reply_upvote_user_id ON public.reply_upvote USING btree (user_id);


--
-- TOC entry 3470 (class 1259 OID 196683)
-- Name: idx_thread_downvote_thread_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_thread_downvote_thread_id ON public.thread_downvote USING btree (thread_id);


--
-- TOC entry 3471 (class 1259 OID 196682)
-- Name: idx_thread_downvote_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_thread_downvote_user_id ON public.thread_downvote USING btree (user_id);


--
-- TOC entry 3466 (class 1259 OID 196664)
-- Name: idx_thread_upvote_thread_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_thread_upvote_thread_id ON public.thread_upvote USING btree (thread_id);


--
-- TOC entry 3467 (class 1259 OID 196663)
-- Name: idx_thread_upvote_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_thread_upvote_user_id ON public.thread_upvote USING btree (user_id);


--
-- TOC entry 3433 (class 1259 OID 147508)
-- Name: idx_threads_category; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_threads_category ON public.threads USING btree (category);


--
-- TOC entry 3434 (class 1259 OID 147510)
-- Name: idx_threads_created_at; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_threads_created_at ON public.threads USING btree (created_at);


--
-- TOC entry 3435 (class 1259 OID 139287)
-- Name: idx_threads_module_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_threads_module_id ON public.threads USING btree (module_id);


--
-- TOC entry 3436 (class 1259 OID 139286)
-- Name: idx_threads_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_threads_user_id ON public.threads USING btree (user_id);


--
-- TOC entry 3437 (class 1259 OID 147509)
-- Name: idx_threads_week; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_threads_week ON public.threads USING btree (week);


--
-- TOC entry 3486 (class 2606 OID 122930)
-- Name: conversation_members conversation_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.conversation_members
    ADD CONSTRAINT conversation_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3495 (class 2606 OID 163854)
-- Name: conversations conversations_user1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_user1_id_fkey FOREIGN KEY (user1_id) REFERENCES public.users(id);


--
-- TOC entry 3496 (class 2606 OID 163859)
-- Name: conversations conversations_user2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_user2_id_fkey FOREIGN KEY (user2_id) REFERENCES public.users(id);


--
-- TOC entry 3480 (class 2606 OID 41098)
-- Name: events_attendance fk_event_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events_attendance
    ADD CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3487 (class 2606 OID 131091)
-- Name: modules_attendance fk_module_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.modules_attendance
    ADD CONSTRAINT fk_module_id FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3491 (class 2606 OID 155661)
-- Name: replies fk_module_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT fk_module_id FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3492 (class 2606 OID 155666)
-- Name: replies fk_parent_reply_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT fk_parent_reply_id FOREIGN KEY (parent_reply_id) REFERENCES public.replies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3475 (class 2606 OID 41073)
-- Name: comments fk_post_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3477 (class 2606 OID 41078)
-- Name: likes fk_post_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3493 (class 2606 OID 155656)
-- Name: replies fk_thread_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT fk_thread_id FOREIGN KEY (thread_id) REFERENCES public.threads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3476 (class 2606 OID 41068)
-- Name: comments fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3479 (class 2606 OID 41088)
-- Name: events fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3481 (class 2606 OID 41093)
-- Name: events_attendance fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events_attendance
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3478 (class 2606 OID 41083)
-- Name: likes fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3488 (class 2606 OID 131086)
-- Name: modules_attendance fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.modules_attendance
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3474 (class 2606 OID 41063)
-- Name: posts fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3494 (class 2606 OID 155651)
-- Name: replies fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3484 (class 2606 OID 73759)
-- Name: friend_requests friend_requests_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3485 (class 2606 OID 73754)
-- Name: friend_requests friend_requests_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3482 (class 2606 OID 73736)
-- Name: friends friends_user1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_user1_id_fkey FOREIGN KEY (user1_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3483 (class 2606 OID 73741)
-- Name: friends friends_user2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_user2_id_fkey FOREIGN KEY (user2_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3499 (class 2606 OID 212992)
-- Name: listings listings_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 3500 (class 2606 OID 180236)
-- Name: listings listings_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.users(id);


--
-- TOC entry 3497 (class 2606 OID 163878)
-- Name: messages messages_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- TOC entry 3498 (class 2606 OID 163883)
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id);


--
-- TOC entry 3503 (class 2606 OID 196639)
-- Name: reply_downvote reply_downvote_reply_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reply_downvote
    ADD CONSTRAINT reply_downvote_reply_id_fkey FOREIGN KEY (reply_id) REFERENCES public.replies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3504 (class 2606 OID 196634)
-- Name: reply_downvote reply_downvote_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reply_downvote
    ADD CONSTRAINT reply_downvote_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3501 (class 2606 OID 196620)
-- Name: reply_upvote reply_upvote_reply_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reply_upvote
    ADD CONSTRAINT reply_upvote_reply_id_fkey FOREIGN KEY (reply_id) REFERENCES public.replies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3502 (class 2606 OID 196615)
-- Name: reply_upvote reply_upvote_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reply_upvote
    ADD CONSTRAINT reply_upvote_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3507 (class 2606 OID 196677)
-- Name: thread_downvote thread_downvote_thread_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.thread_downvote
    ADD CONSTRAINT thread_downvote_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES public.threads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3508 (class 2606 OID 196672)
-- Name: thread_downvote thread_downvote_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.thread_downvote
    ADD CONSTRAINT thread_downvote_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3505 (class 2606 OID 196658)
-- Name: thread_upvote thread_upvote_thread_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.thread_upvote
    ADD CONSTRAINT thread_upvote_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES public.threads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3506 (class 2606 OID 196653)
-- Name: thread_upvote thread_upvote_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.thread_upvote
    ADD CONSTRAINT thread_upvote_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3489 (class 2606 OID 139281)
-- Name: threads threads_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.threads
    ADD CONSTRAINT threads_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3490 (class 2606 OID 139276)
-- Name: threads threads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.threads
    ADD CONSTRAINT threads_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3695 (class 0 OID 0)
-- Dependencies: 3694
-- Name: DATABASE neondb; Type: ACL; Schema: -; Owner: neondb_owner
--

GRANT ALL ON DATABASE neondb TO neon_superuser;


--
-- TOC entry 2147 (class 826 OID 16397)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2146 (class 826 OID 16396)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2026-07-24 17:41:32

--
-- PostgreSQL database dump complete
--

\unrestrict qAP2UIEoJQGTrrMBfcGk1Vd8RHIgZPcGDRYhaGbla8Ix7ZqEfe8v8oU3Mv2gvMF

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict T3FvKrluZdkNHRg0zwIhUH5NrmHeb4ylif8s3nwQrNjNvyHpUVqtU6yUxb8O5qo

-- Dumped from database version 18.4 (2773af8)
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-24 17:41:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 16395)
-- Name: neon; Type: SCHEMA; Schema: -; Owner: cloud_admin
--

CREATE SCHEMA neon;


ALTER SCHEMA neon OWNER TO cloud_admin;

--
-- TOC entry 9 (class 2615 OID 16501)
-- Name: neon_migration; Type: SCHEMA; Schema: -; Owner: cloud_admin
--

CREATE SCHEMA neon_migration;


ALTER SCHEMA neon_migration OWNER TO cloud_admin;

--
-- TOC entry 3 (class 3079 OID 16442)
-- Name: neon; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS neon WITH SCHEMA neon;


--
-- TOC entry 3511 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION neon; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION neon IS 'cloud storage for PostgreSQL';


--
-- TOC entry 2 (class 3079 OID 16398)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- TOC entry 277 (class 1255 OID 16521)
-- Name: get_compute_primary_memory_bytes(); Type: FUNCTION; Schema: public; Owner: cloud_admin
--

CREATE FUNCTION public.get_compute_primary_memory_bytes() RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
    result BIGINT;
    flag_enabled BOOLEAN;
BEGIN
    -- Check if this is a replica (primary should never emit this metric)
    IF NOT pg_catalog.pg_is_in_recovery() THEN
        RETURN NULL;
    END IF;

    -- Check if the autoscaling state transfer flag is enabled
    -- The flag is exposed as a PostgreSQL GUC by compute_ctl
    -- Note: current_setting returns NULL if the setting doesn't exist (with missing_ok=true)
    -- We treat NULL as "flag not enabled" to be safe
    flag_enabled := pg_catalog.current_setting('neon.autoscaling_state_transfer_enabled', true) = 'on';
    IF flag_enabled IS NULL OR NOT flag_enabled THEN
        RETURN NULL;
    END IF;

    -- Get the value from the table
    SELECT (value)::bigint INTO result
    FROM public.lakebase_attributes
    WHERE name = 'primary_memory' AND value IS NOT NULL;

    -- Return NULL if no row found (COALESCE not used - we want NULL to not emit metric)
    RETURN result;
EXCEPTION WHEN OTHERS THEN
    RETURN NULL;
END;
$$;


ALTER FUNCTION public.get_compute_primary_memory_bytes() OWNER TO cloud_admin;

--
-- TOC entry 276 (class 1255 OID 16500)
-- Name: health_check_write_succeeds(); Type: FUNCTION; Schema: public; Owner: cloud_admin
--

CREATE FUNCTION public.health_check_write_succeeds() RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
INSERT INTO public.health_check VALUES (1, now())
ON CONFLICT (id) DO UPDATE
    SET updated_at = now();

RETURN 1;
EXCEPTION WHEN OTHERS THEN
RAISE EXCEPTION '[NEON_SMGR] health_check failed: [%] %', SQLSTATE, SQLERRM;
RETURN 0;
END;
$$;


ALTER FUNCTION public.health_check_write_succeeds() OWNER TO cloud_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 233 (class 1259 OID 16502)
-- Name: migration_id; Type: TABLE; Schema: neon_migration; Owner: cloud_admin
--

CREATE TABLE neon_migration.migration_id (
    key integer NOT NULL,
    id bigint DEFAULT 0 NOT NULL
);


ALTER TABLE neon_migration.migration_id OWNER TO cloud_admin;

--
-- TOC entry 232 (class 1259 OID 16492)
-- Name: health_check; Type: TABLE; Schema: public; Owner: cloud_admin
--

CREATE TABLE public.health_check (
    id integer NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.health_check OWNER TO cloud_admin;

--
-- TOC entry 231 (class 1259 OID 16491)
-- Name: health_check_id_seq; Type: SEQUENCE; Schema: public; Owner: cloud_admin
--

ALTER TABLE public.health_check ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.health_check_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 16511)
-- Name: lakebase_attributes; Type: TABLE; Schema: public; Owner: cloud_admin
--

CREATE TABLE public.lakebase_attributes (
    name text NOT NULL,
    value jsonb,
    last_updated timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.lakebase_attributes OWNER TO cloud_admin;

--
-- TOC entry 3504 (class 0 OID 16502)
-- Dependencies: 233
-- Data for Name: migration_id; Type: TABLE DATA; Schema: neon_migration; Owner: cloud_admin
--

COPY neon_migration.migration_id (key, id) FROM stdin;
0	16
\.


--
-- TOC entry 3503 (class 0 OID 16492)
-- Dependencies: 232
-- Data for Name: health_check; Type: TABLE DATA; Schema: public; Owner: cloud_admin
--

COPY public.health_check (id, updated_at) FROM stdin;
1	2026-07-24 10:40:52.054988+00
\.


--
-- TOC entry 3505 (class 0 OID 16511)
-- Dependencies: 234
-- Data for Name: lakebase_attributes; Type: TABLE DATA; Schema: public; Owner: cloud_admin
--

COPY public.lakebase_attributes (name, value, last_updated) FROM stdin;
\.


--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 231
-- Name: health_check_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloud_admin
--

SELECT pg_catalog.setval('public.health_check_id_seq', 1, false);


--
-- TOC entry 3343 (class 2606 OID 16509)
-- Name: migration_id migration_id_pkey; Type: CONSTRAINT; Schema: neon_migration; Owner: cloud_admin
--

ALTER TABLE ONLY neon_migration.migration_id
    ADD CONSTRAINT migration_id_pkey PRIMARY KEY (key);


--
-- TOC entry 3341 (class 2606 OID 16498)
-- Name: health_check health_check_pkey; Type: CONSTRAINT; Schema: public; Owner: cloud_admin
--

ALTER TABLE ONLY public.health_check
    ADD CONSTRAINT health_check_pkey PRIMARY KEY (id);


--
-- TOC entry 3345 (class 2606 OID 16520)
-- Name: lakebase_attributes lakebase_attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: cloud_admin
--

ALTER TABLE ONLY public.lakebase_attributes
    ADD CONSTRAINT lakebase_attributes_pkey PRIMARY KEY (name);


--
-- TOC entry 3347 (class 2620 OID 16510)
-- Name: migration_id neon_migration_id_superuser_check; Type: TRIGGER; Schema: neon_migration; Owner: cloud_admin
--

CREATE TRIGGER neon_migration_id_superuser_check BEFORE INSERT OR DELETE OR UPDATE OR TRUNCATE ON neon_migration.migration_id FOR EACH STATEMENT EXECUTE FUNCTION neon.neon_check_for_superuser();


--
-- TOC entry 3346 (class 2620 OID 16499)
-- Name: health_check neon_health_check_superuser_check; Type: TRIGGER; Schema: public; Owner: cloud_admin
--

CREATE TRIGGER neon_health_check_superuser_check BEFORE INSERT OR DELETE OR UPDATE OR TRUNCATE ON public.health_check FOR EACH STATEMENT EXECUTE FUNCTION neon.neon_check_for_superuser();


--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 240
-- Name: FUNCTION pg_export_snapshot(); Type: ACL; Schema: pg_catalog; Owner: cloud_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_export_snapshot() TO neon_superuser;


--
-- TOC entry 3514 (class 0 OID 0)
-- Dependencies: 239
-- Name: FUNCTION pg_log_standby_snapshot(); Type: ACL; Schema: pg_catalog; Owner: cloud_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_log_standby_snapshot() TO neon_superuser;


--
-- TOC entry 3515 (class 0 OID 0)
-- Dependencies: 242
-- Name: FUNCTION pg_show_replication_origin_status(OUT local_id oid, OUT external_id text, OUT remote_lsn pg_lsn, OUT local_lsn pg_lsn); Type: ACL; Schema: pg_catalog; Owner: cloud_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_show_replication_origin_status(OUT local_id oid, OUT external_id text, OUT remote_lsn pg_lsn, OUT local_lsn pg_lsn) TO neon_superuser;


-- Completed on 2026-07-24 17:41:35

--
-- PostgreSQL database dump complete
--

\unrestrict T3FvKrluZdkNHRg0zwIhUH5NrmHeb4ylif8s3nwQrNjNvyHpUVqtU6yUxb8O5qo

-- Completed on 2026-07-24 17:41:35

--
-- PostgreSQL database cluster dump complete
--

