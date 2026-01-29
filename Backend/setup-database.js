#!/usr/bin/env node

/**
 * Database Setup Script for ShuleAI Tutor System
 * Creates attributes and indexes for existing collections in Appwrite
 */

require("dotenv").config();
const { Client, Databases, ID, Permission, Role } = require("node-appwrite");

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function setupDatabase() {
  console.log("🚀 Starting ShuleAI database attributes setup...");

  try {
    // Existing collections with their IDs
    const collections = [
      {
        id: process.env.TUTORS_COLLECTION_ID,
        name: "Tutors",
        attributes: [
          { key: "name", type: "string", size: 100, required: true },
          { key: "email", type: "string", size: 150, required: true },
          { key: "phone", type: "string", size: 20, required: true },
          { key: "location", type: "string", size: 200, required: true },
          { key: "bio", type: "string", size: 2000, required: true },
          { key: "subjects", type: "string", size: 1000, required: true }, // JSON array
          { key: "grades", type: "string", size: 500, required: true }, // JSON array
          { key: "availability", type: "string", size: 1000, required: true }, // JSON array
          { key: "hourlyRate", type: "integer", required: true },
          {
            key: "status",
            type: "string",
            size: 20,
            required: true,
            default: "active",
          },
          { key: "rating", type: "double", required: false, default: 5.0 },
          {
            key: "totalSessions",
            type: "integer",
            required: false,
            default: 0,
          },
          {
            key: "completedSessions",
            type: "integer",
            required: false,
            default: 0,
          },
          { key: "joinedAt", type: "datetime", required: true },
          { key: "lastActive", type: "datetime", required: false },
        ],
        indexes: [
          { key: "email_index", type: "key", attributes: ["email"] },
          { key: "status_index", type: "key", attributes: ["status"] },
          { key: "subjects_index", type: "fulltext", attributes: ["subjects"] },
          { key: "location_index", type: "key", attributes: ["location"] },
        ],
      },
      {
        id: process.env.TUTOR_REQUESTS_COLLECTION_ID,
        name: "Tutor Requests",
        attributes: [
          { key: "studentName", type: "string", size: 100, required: true },
          { key: "parentName", type: "string", size: 100, required: true },
          { key: "email", type: "string", size: 150, required: true },
          { key: "phone", type: "string", size: 20, required: true },
          { key: "grade", type: "string", size: 20, required: true },
          { key: "subjects", type: "string", size: 500, required: true }, // JSON array
          { key: "goals", type: "string", size: 2000, required: true },
          { key: "preferredTimes", type: "string", size: 500, required: true }, // JSON array
          { key: "frequency", type: "string", size: 50, required: true },
          { key: "budget", type: "string", size: 50, required: true },
          {
            key: "status",
            type: "string",
            size: 20,
            required: true,
            default: "pending",
          },
          { key: "submittedAt", type: "datetime", required: true },
          {
            key: "matchedTutors",
            type: "string",
            size: 2000,
            required: false,
            default: "[]",
          }, // JSON array
          {
            key: "responses",
            type: "string",
            size: 5000,
            required: false,
            default: "[]",
          }, // JSON array
        ],
        indexes: [
          { key: "email_index", type: "key", attributes: ["email"] },
          { key: "status_index", type: "key", attributes: ["status"] },
          { key: "subjects_index", type: "fulltext", attributes: ["subjects"] },
          { key: "submitted_index", type: "key", attributes: ["submittedAt"] },
          { key: "grade_index", type: "key", attributes: ["grade"] },
        ],
      },
      {
        id: process.env.TUTOR_SESSIONS_COLLECTION_ID,
        name: "Tutor Sessions",
        attributes: [
          { key: "tutorId", type: "string", size: 50, required: true },
          { key: "studentName", type: "string", size: 100, required: true },
          { key: "parentEmail", type: "string", size: 150, required: true },
          { key: "subject", type: "string", size: 50, required: true },
          { key: "grade", type: "string", size: 20, required: true },
          { key: "scheduledAt", type: "datetime", required: true },
          { key: "duration", type: "integer", required: true }, // in minutes
          {
            key: "status",
            type: "string",
            size: 20,
            required: true,
            default: "scheduled",
          },
          { key: "sessionNotes", type: "string", size: 2000, required: false },
          { key: "studentRating", type: "integer", required: false }, // 1-5 stars
          { key: "tutorRating", type: "integer", required: false }, // 1-5 stars
          { key: "amount", type: "double", required: true },
          { key: "paid", type: "boolean", required: false, default: false },
          { key: "createdAt", type: "datetime", required: true },
          { key: "completedAt", type: "datetime", required: false },
        ],
        indexes: [
          { key: "tutor_index", type: "key", attributes: ["tutorId"] },
          { key: "parent_index", type: "key", attributes: ["parentEmail"] },
          { key: "status_index", type: "key", attributes: ["status"] },
          { key: "scheduled_index", type: "key", attributes: ["scheduledAt"] },
        ],
      },
      {
        id: process.env.TUTOR_REVIEWS_COLLECTION_ID,
        name: "Tutor Reviews",
        attributes: [
          { key: "tutorId", type: "string", size: 50, required: true },
          { key: "sessionId", type: "string", size: 50, required: true },
          { key: "parentName", type: "string", size: 100, required: true },
          { key: "parentEmail", type: "string", size: 150, required: true },
          { key: "studentName", type: "string", size: 100, required: true },
          { key: "rating", type: "integer", required: true }, // 1-5 stars
          { key: "review", type: "string", size: 2000, required: false },
          { key: "subject", type: "string", size: 50, required: true },
          { key: "grade", type: "string", size: 20, required: true },
          { key: "isPublic", type: "boolean", required: false, default: true },
          { key: "createdAt", type: "datetime", required: true },
        ],
        indexes: [
          { key: "tutor_index", type: "key", attributes: ["tutorId"] },
          { key: "rating_index", type: "key", attributes: ["rating"] },
          { key: "public_index", type: "key", attributes: ["isPublic"] },
          { key: "created_index", type: "key", attributes: ["createdAt"] },
        ],
      },
    ];

    // Create attributes and indexes for existing collections
    for (const collection of collections) {
      console.log(
        `\n📁 Setting up collection: ${collection.name} (ID: ${collection.id})`,
      );

      if (!collection.id) {
        console.log(
          `   ❌ Collection ID not found for ${collection.name}. Please check your .env file.`,
        );
        continue;
      }

      try {
        // Verify collection exists
        await databases.getCollection(
          process.env.APPWRITE_DATABASE_ID,
          collection.id,
        );
        console.log(`   ✅ Collection '${collection.name}' found`);

        // Create attributes
        console.log(`   🔧 Creating attributes for ${collection.name}...`);

        for (const attr of collection.attributes) {
          try {
            let attributeResponse;

            switch (attr.type) {
              case "string":
                attributeResponse = await databases.createStringAttribute(
                  process.env.APPWRITE_DATABASE_ID,
                  collection.id,
                  attr.key,
                  attr.size,
                  attr.required,
                  attr.default || null,
                  attr.array || false,
                );
                break;
              case "integer":
                attributeResponse = await databases.createIntegerAttribute(
                  process.env.APPWRITE_DATABASE_ID,
                  collection.id,
                  attr.key,
                  attr.required,
                  attr.min || null,
                  attr.max || null,
                  attr.default || null,
                  attr.array || false,
                );
                break;
              case "double":
                attributeResponse = await databases.createFloatAttribute(
                  process.env.APPWRITE_DATABASE_ID,
                  collection.id,
                  attr.key,
                  attr.required,
                  attr.min || null,
                  attr.max || null,
                  attr.default || null,
                  attr.array || false,
                );
                break;
              case "boolean":
                attributeResponse = await databases.createBooleanAttribute(
                  process.env.APPWRITE_DATABASE_ID,
                  collection.id,
                  attr.key,
                  attr.required,
                  attr.default || null,
                  attr.array || false,
                );
                break;
              case "datetime":
                attributeResponse = await databases.createDatetimeAttribute(
                  process.env.APPWRITE_DATABASE_ID,
                  collection.id,
                  attr.key,
                  attr.required,
                  attr.default || null,
                  attr.array || false,
                );
                break;
              default:
                console.log(
                  `     ⚠️  Unknown attribute type: ${attr.type} for ${attr.key}`,
                );
                continue;
            }

            console.log(
              `     ✅ Created attribute: ${attr.key} (${attr.type})`,
            );

            // Wait a bit to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 100));
          } catch (attrError) {
            if (
              attrError.message.includes("already exists") ||
              attrError.message.includes("Attribute already exists")
            ) {
              console.log(
                `     ⚠️  Attribute ${attr.key} already exists, skipping...`,
              );
            } else {
              console.log(
                `     ❌ Failed to create attribute ${attr.key}:`,
                attrError.message,
              );
            }
          }
        }

        // Wait for attributes to be ready before creating indexes
        console.log(`   ⏳ Waiting for attributes to be ready...`);
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Create indexes
        if (collection.indexes && collection.indexes.length > 0) {
          console.log(`   🔍 Creating indexes for ${collection.name}...`);

          for (const index of collection.indexes) {
            try {
              await databases.createIndex(
                process.env.APPWRITE_DATABASE_ID,
                collection.id,
                index.key,
                index.type,
                index.attributes,
                index.orders || [],
              );
              console.log(`     ✅ Created index: ${index.key}`);

              // Wait a bit to avoid rate limiting
              await new Promise((resolve) => setTimeout(resolve, 200));
            } catch (indexError) {
              if (
                indexError.message.includes("already exists") ||
                indexError.message.includes("Index already exists")
              ) {
                console.log(
                  `     ⚠️  Index ${index.key} already exists, skipping...`,
                );
              } else {
                console.log(
                  `     ❌ Failed to create index ${index.key}:`,
                  indexError.message,
                );
              }
            }
          }
        }
      } catch (collectionError) {
        if (collectionError.message.includes("not found")) {
          console.log(
            `   ❌ Collection ${collection.name} not found. Please verify collection ID: ${collection.id}`,
          );
        } else {
          console.log(
            `   ❌ Error setting up collection ${collection.name}:`,
            collectionError.message,
          );
        }
      }
    }

    console.log("\n🎉 Database attributes setup completed!");
    console.log("\n📋 Summary of collections configured:");
    console.log("• tutors - Stores tutor profiles and information");
    console.log("• tutor_requests - Stores student requests for tutors");
    console.log("• tutor_sessions - Tracks scheduled and completed sessions");
    console.log("• tutor_reviews - Stores reviews and ratings");

    console.log("\n✅ Your ShuleAI tutor system database is ready!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

// Run setup if called directly
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log("Setup completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Setup failed:", error);
      process.exit(1);
    });
}

module.exports = { setupDatabase };
