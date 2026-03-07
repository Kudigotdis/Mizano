window.MIZANO_DATA = window.MIZANO_DATA || {};
window.MIZANO_DATA.community_extended = [];
for (let i = 0; i < 100; i++) {
    const locs = ["Gaborone", "Francistown", "Maun", "Serowe"];
    const loc = locs[i % locs.length];
    window.MIZANO_DATA.community_extended.push({
        "post_id": `COM-EXT-${i}`,
        "author_uid": `USR-BW-GAB-${1000 + i}`,
        "content": `Community discussion about sports in ${loc}. Really excited for the next tournament!`,
        "location": loc,
        "timestamp": Date.now() - (i * 3600000),
        "likes": i * 3,
        "comments_count": i % 10
    });
}
