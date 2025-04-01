-- CreateTable
CREATE TABLE "songs" (
    "id" TEXT NOT NULL,
    "originalSongYoutubeLink" TEXT,
    "originalSongName" TEXT,
    "originalSongSinger" TEXT,
    "originalSongLyricsFiller" TEXT,
    "originalSongAuthor" TEXT,
    "originalSongLyrics" TEXT,
    "alternativeSongYoutubeLink" TEXT,
    "alternativeSongName" TEXT,
    "alternativeSongSinger" TEXT,
    "alternativeSongLyricsFiller" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);
