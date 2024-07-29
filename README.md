Backend API which has Authorization, Users, Discussions and Comments. Used MongoDB database and ExpressJS framework.
APIs are on : https://go.postman.co/workspace/d738b5e4-211c-4109-853d-5f455ee9b978

<h1>1. Service APIs</h1>

<h3>Auth Endpoints:</h3>
<code>POST /auth/signup: User signup
POST /auth/login: User login</code>
<h3>User Endpoints:</h3>
<code>POST /users: Create User
PUT /users/{id}: Update User
DELETE /users/{id}: Delete User
GET /users: Show list of users
GET /me: Show me
GET /users/search: Search user based on name
POST /users/{id}/follow: Follow a user
DELETE /users/{id}/follow: Unfollow a user</code>
<h3>Discussion Endpoints:</h3>
<code>POST /discussions: Create Discussion
PUT /discussions/{id}: Update Discussion
DELETE /discussions/{id}: Delete Discussion
GET /discussions/{id}: Get Discussion
GET /discussions/tags: Get list of discussions based on tags
GET /discussions/search: Get list of discussions based on certain text
POST /discussions/{id}/likes: Like a discussion
DELETE /discussions/{id}/likes: Unlike a discussion</code>
<h3>Comment Endpoints:</h3> 
<code>POST /discussions/{discussion_id}/comments: Create Comment
PUT /discussions/{discussion_id}/comments/{id}: Update Comment
DELETE /discussions/{discussion_id}/comments/{id}: Delete Comment
POST /discussions/{discussion_id}/comments/{id}/likes: Like a comment
DELETE /discussions/{discussion_id}/comments/{id}/likes: Unlike a comment
POST /discussions/{discussion_id}/comments/{id}/reply: Reply a comment</code>

<h1>2. Database Schemas</h1>
<h3>Explanation of the Database Schema Diagram</h3>
This diagram depicts the relationships between four entities: <b>user, discussion, comment, and reply</b>.
<h4>User</h4>
Attributes:
<ul>
<li>id: Unique identifier (Primary Key).</li>
<li>name: User's name.</li>
<li>email: User's email (unique).</li>
<li>mobile: User's mobile number (unique).</li>
<li>password: User's password.</li>
<li>followers: List of userIds representing users who follow this user.</li>
<li>following: List of userIds representing users this user follows.</li>
<li>recordStatus: Status of the user record.</li>
</ul>
<h4>Discussion</h4>
Attributes:
<li>id: Unique identifier (Primary Key).</li>
<li>text: The text content of the discussion.</li>
<li>image: Image URL.</li>
<li>hashTags: List of hashtags associated with the discussion.</li>
<li>viewCount: Number of views.</li>
<li>createdOn: Creation date.</li>
<li>userId: Reference to the user who created the discussion.</li>
<li>comments: List of comment objects related to the discussion.</li>
<li>likes: List of userIds who liked the discussion.</li>
<li>recordStatus: Status of the discussion record.</li>
<h4>Comment</h4>
Attributes:
<li>id: Unique identifier (Primary Key).</li>
<li>description: Text of the comment.</li>
<li>userId: Reference to the user who created the comment.</li>
<li>likes: List of userIds who liked the comment.</li>
<li>createdOn: Creation date.</li>
<li>replies: List of reply objects related to the comment.</li>
<li>recordStatus: Status of the comment record.</li>
<h4>Reply</h4>
Attributes:
<li>userId: Reference to the user who created the reply.</li>
<li>text: Text of the reply.</li>

<h3>Relationships</h3>
<ul>
<li><b>User to Discussion:</b> One-to-Many relationship; a user can create multiple discussions.</li>
<li><b>Discussion to Comment:</b> One-to-Many relationship; a discussion can have multiple comments.</li>
<li><b>Comment to Reply:</b> One-to-Many relationship; a comment can have multiple replies.</li>
<li><b>User to Follower/Following:</b> Many-to-Many self-referential relationship; users can follow and be followed by many users.</li>
</ul>
