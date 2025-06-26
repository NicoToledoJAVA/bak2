// utils/getNextId.js


  export async function getNextId(model) {
    const lastDoc = await model.findOne().sort({ num: -1 }).select("num");
    return lastDoc && typeof lastDoc.num === "number" ? lastDoc.num + 1 : 1;
  }
