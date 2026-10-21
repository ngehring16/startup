export function getDailyIds(ids) {
    const day = Math.floor(Date.now() / 86400000);

    const firstId = ids[day % ids.length];
    const lastId = ids[(day + 125) % ids.length];

    return { firstId, lastId };
}