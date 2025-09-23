/**
 * Parse les compétences en les séparant par virgules
 * Exemples:
 * - "Blender, After Effects, Cinema 4D" → ["Blender", "After Effects", "Cinema 4D"]
 */
export function parseSkills(skillString: string): string[] {
  if (!skillString || skillString.trim() === '') {
    return [];
  }

  return skillString
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
}
