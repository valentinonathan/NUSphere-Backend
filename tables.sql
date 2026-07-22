CREATE table users (
	id BIGSERIAL PRIMARY KEY,
	username VARCHAR(30) UNIQUE,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30),
	password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id BIGINT REFERENCES users(id) NOT NULL,
	url TEXT NOT NULL
);

CREATE TABLE conversations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user1_id BIGINT NOT NULL REFERENCES users(id),
    user2_id BIGINT NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user1_id, user2_id),
    CHECK (user1_id <> user2_id)
);

CREATE TABLE messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id BIGINT NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE comments (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	post_id BIGINT REFERENCES posts(id) NOT NULL,
	user_id BIGINT REFERENCES users(id) NOT NULL,
	content TEXT
);

CREATE TABLE likes (
	PRIMARY KEY(post_id, user_id),
	user_id BIGINT REFERENCES users(id) NOT NULL,
	post_id BIGINT REFERENCES posts(id) NOT NULL
);

CREATE TABLE events (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id BIGINT REFERENCES users(id) NOT NULL;
);

CREATE TABLE events_attendance (
	PRIMARY KEY(event_id, user_id),
	event_id BIGINT REFERENCES events(id) NOT NULL,
	user_id BIGINT REFERENCES users(id) NOT NULL
);

CREATE TABLE friends (
	user1_id BIGINT NOT NULL,
	user2_id BIGINT NOT NULL,

	PRIMARY KEY (user1_id, user2_id),

	FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,

	CHECK (user1_id < user2_id)
);

CREATE TABLE friend_requests (
	sender_id BIGINT NOT NULL,
	receiver_id BIGINT NOT NULL,

	PRIMARY KEY (sender_id, receiver_id),

	FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE conversations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('direct', 'group')),
    name TEXT,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
	image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE listing_categories (
    listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,

    PRIMARY KEY (listing_id, category_id)
);

