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
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	is_system_message BOOLEAN NOT NULL DEFAULT FALSE;
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
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	category_id INTEGER REFERENCES categories(id),
	status VARCHAR(20) NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Reserved', 'Sold', 'Cancelled'));
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE market_conversations (
    conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,

    PRIMARY KEY (conversation_id, listing_id)
);
CREATE UNIQUE INDEX unique_listing_buyer
ON market_conversations(listing_id, conversation_id);


<<<<<<< HEAD
CREATE TABLE conversation_members (
    conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member'
        CHECK (role IN ('member', 'admin')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_read_message_id BIGINT,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id BIGINT NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_messages_conversation_created
ON messages (conversation_id, created_at DESC);

CREATE INDEX idx_conversation_members_user
ON conversation_members (user_id);


CREATE TABLE modules (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title VARCHAR(255) NOT NULL UNIQUE,
	atendees INTEGER DEFAULT 0,
	banner_url TEXT NOT NULL
)

CREATE TABLE modules_attendance(
	user_id BIGINT NOT NULL,
	module_id BIGINT NOT NULL,
	PRIMARY KEY (user_id, module_id)
)

CREATE TABLE threads(
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id BIGINT NOT NULL,
	module_id BIGINT NOT NULL,
	title VARCHAR(255) NOT NULL,
	image_url TEXT,
	body TEXT,
	upvote INTEGER DEFAULT 0,
	downvote INTEGER DEFAULT 0,
	replies INTEGER DEFAULT 0,
	category VARCHAR(255) NOT NULL,
	week INTEGER NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_threads_user_id ON threads(user_id);
CREATE INDEX idx_threads_module_id ON threads(module_id);

CREATE TABLE replies(
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id BIGINT NOT NULL,
	module_id BIGINT NOT NULL,
	thread_id BIGINT NOT NULL,
	parent_reply_id BIGINT,
	body TEXT NOT NULL,
	upvote INTEGER DEFAULT 0,
	downvote INTEGER DEFAULT 0,
	created_at TIMESTAMP DEFAULT NOW(),

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (parent_reply_id) REFERENCES replies(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_replies_user_id ON replies(user_id);
CREATE INDEX idx_replies_module_id ON replies(module_id);
CREATE INDEX idx_replies_thread_id ON replies(thread_id);
CREATE INDEX idx_replies_parent_reply_id ON replies(parent_reply_id);

CREATE TABLE reply_upvote (
	PRIMARY KEY(reply_id, user_id),
	user_id BIGINT NOT NULL,
	reply_id BIGINT NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (reply_id) REFERENCES replies(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE reply_downvote (
	PRIMARY KEY(reply_id, user_id),
	user_id BIGINT NOT NULL,
	reply_id BIGINT NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (reply_id) REFERENCES replies(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE thread_upvote (
	PRIMARY KEY(thread_id, user_id),
	user_id BIGINT NOT NULL,
	thread_id BIGINT NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE thread_downvote (
	PRIMARY KEY(thread_id, user_id),
	user_id BIGINT NOT NULL,
	thread_id BIGINT NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE ON UPDATE CASCADE
);
=======
>>>>>>> cee876629ce7590df5367597188bfe40b54f81ca
