--
-- PostgreSQL database dump
--

\restrict EqhIn9rg0fh7qmHfhCQtMcwySfrhh5F5xOUTlkc9rCIVHfTf33xkcKzjAvJ6Ici

-- Dumped from database version 18.4 (48c2093)
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-21 22:09:01

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
-- TOC entry 228 (class 1259 OID 41033)
-- Name: events; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.events (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(255),
    description character varying(2000),
    location character varying(255),
    start_time timestamp without time zone
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
-- TOC entry 219 (class 1259 OID 24576)
-- Name: test; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.test (
    name character varying(255)
);


ALTER TABLE public.test OWNER TO neondb_owner;

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
-- TOC entry 3508 (class 0 OID 40990)
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
20	2	1	Gw comment nih
21	1	19	Gw comment lagi
22	1	9	Keren
23	2	19	Haha mantap
\.


--
-- TOC entry 3511 (class 0 OID 41033)
-- Dependencies: 228
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.events (id, user_id, title, description, location, start_time) FROM stdin;
1	1	\N	\N	\N	\N
3	22	\N	\N	\N	\N
4	22	Study at CLB	\N	\N	\N
5	22	Study at CLB	asdfnasjdf	asdnfjaksdjfn	2026-06-20 18:30:00
6	22	Study at CLB	asdfnasjdf	asdnfjaksdjfn	2026-06-20 18:30:00
7	1	test1	test1	test1	2026-09-01 04:12:00
8	1	test2	test2	test2	2026-06-02 04:03:00
9	1	test2	test2	test2	2026-06-17 04:12:00
16	22	test3	test3	test3	2026-06-16 20:12:00
17	22	test4	test4	test4	2026-12-13 05:13:00
18	22	test5	test5	test5	2026-12-12 05:13:00
19	22	test6	test6	test6	2026-12-12 05:13:00
20	22	test7	test7-pls jalan	test7	2027-12-12 05:13:00
21	35	test8	test8	test8	2026-12-12 04:12:00
22	35	test9	test9	test9	2026-12-12 04:12:00
23	35	test10	test10	test10	2026-12-12 04:12:00
\.


--
-- TOC entry 3512 (class 0 OID 41046)
-- Dependencies: 229
-- Data for Name: events_attendance; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.events_attendance (event_id, user_id) FROM stdin;
1	1
20	22
20	35
23	35
5	35
6	35
6	22
\.


--
-- TOC entry 3514 (class 0 OID 73747)
-- Dependencies: 231
-- Data for Name: friend_requests; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.friend_requests (sender_id, receiver_id, created_at) FROM stdin;
\.


--
-- TOC entry 3513 (class 0 OID 73728)
-- Dependencies: 230
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.friends (user1_id, user2_id) FROM stdin;
9	19
1	9
1	19
\.


--
-- TOC entry 3509 (class 0 OID 41013)
-- Dependencies: 226
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.likes (user_id, post_id) FROM stdin;
19	1
19	2
9	1
9	2
1	1
1	2
9	14
1	14
1	15
19	15
\.


--
-- TOC entry 3506 (class 0 OID 40974)
-- Dependencies: 223
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.posts (id, user_id, url, caption, likes, comments, created_at) FROM stdin;
2	19	https	\N	3	2	2026-06-19 19:04:21.639255+00
1	1	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1781980783161-post-image.jpg	Just graduated!	3	11	2026-06-19 19:04:21.639255+00
14	9	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1781983204679-post-image.jpg	Late Japan post last winter!	2	0	2026-06-20 19:20:05.476563+00
15	1	https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/post-images/1782049278658-post-image.jpg	This app is sick!	2	0	2026-06-21 13:41:19.476539+00
\.


--
-- TOC entry 3502 (class 0 OID 24576)
-- Dependencies: 219
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.test (name) FROM stdin;
You have been logged in and the DB has been connected
\.


--
-- TOC entry 3504 (class 0 OID 40963)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, first_name, last_name, password_hash, nationality, year, faculty, major, residence, bio, friends, new_post) FROM stdin;
36	calvinpandiangan3	Calvin	Pandiangan	$2b$10$7le2g2FNzNV79mWNXaVOAOXeOOfRW8SKQOSAng2271wvJPxta0eCe	Indonesian	Undergraduate Y2	School of Computing	Computer Science	Prince George's Park Residence	Im a pro	0	-1
5	TestAgain2awda	Test		$2b$10$D/cK4EH21PGdXLFL1ak9nO4/bwZp/wmSfrfH7navd9UtEv72XOvPq	\N	\N	\N	\N	\N	\N	0	-1
6	1234ada	Valen		$2b$10$0a7gbajAQgSLF9wLr/d1bO21JpWN.stydkI4E.kS8oPUyVJzSgZyS	\N	\N	\N	\N	\N	\N	0	-1
10	testwow	Test	Wow	$2b$10$u1QiM1vm3r9IqA/zWWVgNeZ6fiPy2Pi3Ou/Eg4n0VCb4v5ZC/4ob.	\N	\N	\N	\N	\N	\N	0	-1
11	testadwadawd	Test	ARGHHH	$2b$10$uYc1M2ua0NBClTGTNvs2XOCIBA4dLW6ibGzmEe9HHD5mwzn9Bf61W	Indian	Undergraduate Y3	Design and Engineering	Applied Mathematics	College of Alice & Peter Tan	\N	0	-1
14	account_baru	Account	Baru	$2b$10$NlQRKR9WHGaRxtlVreJFluzLfbmbi.p8hl/K1lJXk00vDaO2tt7YG	\N	\N	\N	\N	\N	\N	0	-1
15	dawdadawd	Account	d	$2b$10$jdfR5Dz/qXA2OHC6.XZ8pOOCNeTv6ZarJrTDgRxtoUkuStu4RPvJa	\N	\N	\N	\N	\N	\N	0	-1
16	1234adak	Valen		$2b$10$KyVN.3gsX6X4dCreDy9dEuky7vNSR0Ac1Q300MBYTgEYfeDfDYtVC	\N	\N	\N	\N	\N	\N	0	-1
18	testuser	Test	User	$2b$10$ANGOy5UgF3EGF8RsjGlEpO5havV8HtwQcCWQrNfeO4aTvRsJihds.		Undergraduate Y2	Design and Engineering	Architecture	College of Alice & Peter Tan	\N	0	-1
21	awdawdada	Valentino	ada	$2b$10$.MTfEQhtyhcQ1xQ/jseIqOM1cmlTs97kQ8OsBjam.2QmTJWqBRevy		Undergraduate Y3	Dentistry	Architecture	College of Alice & Peter Tan	\N	0	-1
25	banghaha	Bang	Haha	$2b$10$WFW3jIeSuUJQaTSDIFK6ZO.THivVX5g/gCTiWHMp71w5qn07g1EjW	\N	\N	\N	\N	\N	\N	0	-1
20	valentinoplease	Valentino		$2b$10$rx1NDAS/tR19P.ApwEST/.V1d40fId.zzL1kz8lCAstWGRFDK22P.	\N	\N	\N	\N	\N	\N	0	-1
26	ryanang	Ryan	Ang	$2b$10$H9IkJOZQC8Aa7KiRRw4m2uBL3eHc9qakUYM1.bdlZw0ss8q0GX96m	\N	\N	\N	\N	\N	\N	0	-1
28	newuser	New	User	$2b$10$J6rFJzpAbrXiSAgDYFOCr.43o8uuui2uBGLjpqVHAxnRtz6tXvbCC	\N	\N	\N	\N	\N	\N	0	-1
29	Hahauser	new	user	$2b$10$sZeuDtD17Ox.rQRmyC993O3eQLCl7ET72BfjE22qvsa2YEO7QQ3A2	\N	\N	\N	\N	\N	\N	0	-1
30	User1	TestUser	TestUser	$2b$10$ixLltR6anqckQfjgMmoBO.GNwIx72QA.bV45rZlEi58U0LNvlHkF.	\N	\N	\N	\N	\N	\N	0	-1
31	User2	aaaaa		$2b$10$w4MBqBDd5fdi6593MQ/2A.gqg812tSw2c.HxRPuxnE0z7gLKbBiBu	\N	\N	\N	\N	\N	\N	0	-1
32	User3	aaaaa		$2b$10$/x6ZvY1rOupHzLPqXXD6N.mohSx6q11ngWrTNbuWCQeAG6MLrNzlm	\N	\N	\N	\N	\N	\N	0	-1
33	User4	aaaaa		$2b$10$jt.kQm/6Ze21Bu9C9wrxC.xxC1.IwBJWKWudRAdjs6tkVBigWlkBW	Chinese	Undergraduate Y3	Dentistry	Architecture	Eusoff Hall	\N	0	-1
34	User5	aaaaaa		$2b$10$EQlmC3yq5p9HopEp1q/HwuYq1K9Rj8Ad1qxqxxYRR/RybtGby1pmq	Singapore PR	Undergraduate Y3	Dentistry	Architecture	College of Alice & Peter Tan	\N	0	-1
35	calvinpandiangan2	Calvin	Pandiangan	$2b$10$thj..AUL1YVVjjSkOA5MoeLFdCKrJpCrTtDNnvXWE0D9XA9HnWXFC	Indonesian	Undergraduate Y2	School of Computing	Computer Science	Prince George's Park Residence	\N	0	-1
1	TestUser	Jamie	Chang	$2b$10$.UFX60ok67.pEIAJhm6nmOnqVq.CtJh4cEDIhDjqA4jGgG8Utf/pK	Singapore PR	Undergraduate Y2	Dentistry	Architecture	Cendana College	Test User is a good boy	2	-1
9	TestAgain	Test	Again	$2b$10$1lCHwn9jc6blwThrA4HWQOj8tGeA2uhNEoSclnp6Csmb5DWRMaI2W	Malaysian	Undergraduate Y3	Design and Engineering	Anthropology	College of Alice & Peter Tan	\N	2	-1
19	_valentino_nathan_	Valentino	Nathan	$2b$10$PS8tcJrnpyKgX5XDDp1HYuAKY0U3owIsEmsoTXM.MVrQJsAd76BBW	Indonesian	Undergraduate Y2	School of Computing	Computer Science	Prince George's Park Residence	This is my bio	2	-1
22	calvinpandiangan	calvin	pandiangan	$2b$10$JOpHNxltA8HimKsx9Rg66OZzZFclBG1PTxWHVXlBYCdKUpP1ffDuy	Indonesian	Undergraduate Y2	School of Computing	Computer Science	Prince George's Park Residence	\N	0	-1
23	TestUser1	test	user	$2b$10$SvdywiL2syK0nrjeQA77UeYe5VbmbhK2oAYMTypn3QAJzQXrQ0hTW	\N	\N	\N	\N	\N	\N	0	-1
24	AnotherUser	Test	User	$2b$10$ahv5/7La6WCFqOITiKdiVeH/bXjZW9Qyh9UKFGVtcpkMVsdLuyKP6	Singapore PR	Undergraduate Y4	School of Computing	Artificial Intelligence	Cendana College	\N	0	-1
\.


--
-- TOC entry 3520 (class 0 OID 0)
-- Dependencies: 224
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.comments_id_seq', 23, true);


--
-- TOC entry 3521 (class 0 OID 0)
-- Dependencies: 227
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.events_id_seq', 23, true);


--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 222
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.posts_id_seq', 15, true);


--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 36, true);


--
-- TOC entry 3324 (class 2606 OID 40999)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3335 (class 2606 OID 41052)
-- Name: events_attendance events_attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events_attendance
    ADD CONSTRAINT events_attendance_pkey PRIMARY KEY (event_id, user_id);


--
-- TOC entry 3332 (class 2606 OID 41039)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 3342 (class 2606 OID 73753)
-- Name: friend_requests friend_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_pkey PRIMARY KEY (sender_id, receiver_id);


--
-- TOC entry 3339 (class 2606 OID 73735)
-- Name: friends friends_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (user1_id, user2_id);


--
-- TOC entry 3330 (class 2606 OID 41019)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (post_id, user_id);


--
-- TOC entry 3322 (class 2606 OID 40983)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 3337 (class 2606 OID 65537)
-- Name: events_attendance unique_event_attendance; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events_attendance
    ADD CONSTRAINT unique_event_attendance UNIQUE (event_id, user_id);


--
-- TOC entry 3317 (class 2606 OID 40970)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3319 (class 2606 OID 40972)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3325 (class 1259 OID 41012)
-- Name: idx_comments_post_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_comments_post_id ON public.comments USING btree (post_id);


--
-- TOC entry 3326 (class 1259 OID 41011)
-- Name: idx_comments_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_comments_user_id ON public.comments USING btree (user_id);


--
-- TOC entry 3333 (class 1259 OID 41045)
-- Name: idx_events_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_events_user_id ON public.events USING btree (user_id);


--
-- TOC entry 3340 (class 1259 OID 73746)
-- Name: idx_friends_user2_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_friends_user2_id ON public.friends USING btree (user2_id);


--
-- TOC entry 3327 (class 1259 OID 41030)
-- Name: idx_likes_post_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_likes_post_id ON public.likes USING btree (post_id);


--
-- TOC entry 3328 (class 1259 OID 41031)
-- Name: idx_likes_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_likes_user_id ON public.likes USING btree (user_id);


--
-- TOC entry 3320 (class 1259 OID 41010)
-- Name: idx_posts_user_id; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_posts_user_id ON public.posts USING btree (user_id);


--
-- TOC entry 3349 (class 2606 OID 41098)
-- Name: events_attendance fk_event_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events_attendance
    ADD CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3344 (class 2606 OID 41073)
-- Name: comments fk_post_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3346 (class 2606 OID 41078)
-- Name: likes fk_post_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3345 (class 2606 OID 41068)
-- Name: comments fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3348 (class 2606 OID 41088)
-- Name: events fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3350 (class 2606 OID 41093)
-- Name: events_attendance fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.events_attendance
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3347 (class 2606 OID 41083)
-- Name: likes fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3343 (class 2606 OID 41063)
-- Name: posts fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3353 (class 2606 OID 73759)
-- Name: friend_requests friend_requests_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3354 (class 2606 OID 73754)
-- Name: friend_requests friend_requests_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3351 (class 2606 OID 73736)
-- Name: friends friends_user1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_user1_id_fkey FOREIGN KEY (user1_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3352 (class 2606 OID 73741)
-- Name: friends friends_user2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_user2_id_fkey FOREIGN KEY (user2_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2088 (class 826 OID 16397)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2087 (class 826 OID 16396)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2026-06-21 22:09:07

--
-- PostgreSQL database dump complete
--

\unrestrict EqhIn9rg0fh7qmHfhCQtMcwySfrhh5F5xOUTlkc9rCIVHfTf33xkcKzjAvJ6Ici

