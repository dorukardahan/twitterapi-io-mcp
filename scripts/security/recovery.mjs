export function approvalCommand(main, wrapper) {
  if (main.commit !== wrapper.commit) throw new Error('Package commit mismatch');
  for (const hash of [main.sha256, wrapper.sha256]) {
    if (!/^[a-f0-9]{64}$/.test(hash)) throw new Error('Invalid artifact digest');
  }
  return `approve-release ${main.commit} ${main.sha256} ${wrapper.sha256}`;
}
export function ownerApproved(comments, owner, command) {
  return comments.some(c => c.user?.login === owner && c.body?.trim() === command);
}
