import { pb } from "./database";

export async function postContent(content) {
  try {
    const movie = await pb.collection("contents").create({
      title: content?.title || content?.name,
      body: content?.overview || "",
      poster: `https://image.tmdb.org/t/p/original${content.poster_path}`,
      rating: content.vote_average,
      votes: content.vote_count,
    });
    return movie;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function addContentToCollection(idOFcollection, contentId) {
  try {
    const collection = await pb
      .collection("collections")
      .getOne(idOFcollection, { expand: "contents" });


    let existingContentIds = [];
    if (collection.expand.contents.length !== 0) {
      existingContentIds = collection.expand.contents.map(
        (content) => content.id,
      );
    }


    const updatedCollection = await pb
      .collection("collections")
      .update(idOFcollection, {
        contents: [ ...existingContentIds,contentId],
      });

    return updatedCollection;
  } catch (e) {
    throw new Error(e.message);
  }
}
