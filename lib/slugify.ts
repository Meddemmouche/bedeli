export function generateSlug(title: string, id?: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return id ? `${slug}-${id}` : slug;
}