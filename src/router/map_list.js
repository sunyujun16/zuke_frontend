import CommunityList from "@/views/map/CommunityList";
import MapPage from "@/views/map/MapPage";

export default {
    // 它妈的，斜杠啊，忘了好几次了，老年痴呆啊？
    path: '/map_list',
    name: 'map_list',
    components: {
        map_page: MapPage,
        community_list: CommunityList,
    }
}