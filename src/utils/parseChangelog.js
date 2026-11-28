export function parseChangelog(markdown) {
  const releases = [];
  let currentRelease = null;
  let currentSection = null;
  let currentGroup = null;

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("## ")) {
      currentRelease = {
        version: line.slice(3).trim(),
        date: "",
        latest: releases.length === 0,
        sections: [],
      };
      releases.push(currentRelease);
      currentSection = null;
      currentGroup = null;
      continue;
    }

    if (!currentRelease) continue;

    if (line.startsWith("### ")) {
      currentSection = {
        category: line.slice(4).trim(),
        groups: [],
      };
      currentRelease.sections.push(currentSection);
      currentGroup = null;
      continue;
    }

    if (line.startsWith("#### ")) {
      if (!currentSection) {
        currentSection = { category: "Updates", groups: [] };
        currentRelease.sections.push(currentSection);
      }
      currentGroup = {
        title: line.slice(5).trim(),
        items: [],
      };
      currentSection.groups.push(currentGroup);
      continue;
    }

    if (line.startsWith("- ")) {
      if (!currentSection) {
        currentSection = { category: "Updates", groups: [] };
        currentRelease.sections.push(currentSection);
      }
      if (!currentGroup) {
        currentGroup = { title: "", items: [] };
        currentSection.groups.push(currentGroup);
      }
      currentGroup.items.push(line.slice(2).trim());
      continue;
    }

    const releasedMatch = line.match(/^Released on\s+([0-9]{4}-[0-9]{2}-[0-9]{2})\.?$/i);
    if (releasedMatch && !currentRelease.date) {
      currentRelease.date = releasedMatch[1];
    }
  }

  return releases;
}
