/**
 * Shrinks a photograph in the browser before a form sends it.
 *
 * A phone photograph is 3-6 MB and a server action takes 4 MB for the whole
 * form (`serverActions.bodySizeLimit` in `next.config.ts`), so each picture is
 * redrawn as a JPEG no longer than `maxEdge` on its long side — a few hundred
 * KB, and still plenty to judge a rim edge or a run of vinyl lettering by. A
 * file the browser cannot decode (HEIC on a desktop browser, say) is returned
 * as it is, and the form's size check at submit catches it if that is too
 * much.
 *
 * Shared by the two forms that take photographs: the WHEELUV™ suitability form
 * and the signage removal quote form. Browser-only — it draws on a canvas.
 */
export async function shrinkPhoto(file: File, maxEdge = 1800): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  if (file.size <= 600 * 1024 && /^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "") || "photo"}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}
