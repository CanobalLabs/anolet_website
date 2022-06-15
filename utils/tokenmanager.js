export default function save(token) { localStorage.setItem('ANALTOK', token); }
export default function loggedIn() { return localStorage.getItem("ANALTOK") != null }