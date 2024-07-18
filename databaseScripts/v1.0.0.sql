CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    userType VARCHAR(60),
    hPassword VARCHAR(60)
);

CREATE TABLE fields (
    fieldId INT PRIMARY KEY AUTO_INCREMENT,
    fieldName VARCHAR(60),
    visibility VARCHAR(10) -- EVERYONE / OWNER / PROTECTED / NONE
);

CREATE TABLE profiles (
    userId INT REFERENCES users(userId),
    fieldId INT REFERENCES fields(fieldId),
    value VARCHAR(255),
    PRIMARY KEY(userId, fieldId)
);

CREATE TABLE sessions (
    token VARCHAR(32) PRIMARY KEY,
    userId INT REFERENCES users(userId),
    validity INT
);