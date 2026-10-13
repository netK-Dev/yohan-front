-- Complete the schema used by the application after the historical migrations.
-- This migration only adds fields/tables; existing project data is preserved.
ALTER TABLE "public"."projects_v2"
ADD COLUMN "videos" JSONB DEFAULT '[]',
ADD COLUMN "software" TEXT[] DEFAULT ARRAY[]::TEXT[];

CREATE TABLE "public"."slider_media" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "mediaUrl" TEXT NOT NULL,
    "mediaPath" TEXT,
    "mediaType" TEXT NOT NULL DEFAULT 'image',
    "category" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "slider_media_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."page_content" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "page_content_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "page_content_page_section_key" ON "public"."page_content"("page", "section");
