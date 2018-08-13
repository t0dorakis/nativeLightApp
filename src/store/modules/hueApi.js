import axios from 'axios';


const state = {
    count: 0,
    devMode: true, // activate this to short circuit hue registration
    credentials: {
        username: 'ByJpRUfzIi68Mn3FJA8Nla9AM9l1iW3CAgTVfIEe'
    },
    bridges: [
        {
            internalipaddress: '192.168.2.150',
            id: ''
        }
    ],
    lights: [
        {
            state: {
                on: true,
                bri: 254,
                alert: "none",
                mode: "homeautomation",
                reachable: true
            },
            // "swupdate": {
            //     "state": "readytoinstall",
            //     "lastinstall": "2017-09-12T19:00:20"
            // },
            type: "Dimmable light",
            name: "Große Lampe",
            modelid: "LWB004",
            manufacturername: "Philips",
            productname: "Hue white lamp",
            capabilities: {
                certified: true,
                control: {
                    mindimlevel: 2000,
                    maxlumen: 750
                },
                streaming: {
                    renderer: false,
                    proxy: false
                }
            },
            config: {
                archetype: "sultanbulb",
                function: "functional",
                direction: "omnidirectional"
            },
            uniqueid: "00:17:88:01:00:db:72:0b-0b",
            swversion: "5.38.2.19136"
        }
    ]
};

const mutations = {

    decrement (state) {
        state.count--;
    },
    increment (state) {
        state.count++;
    },
    setBridges (state, data) {
        state.bridges = [];
        state.bridges = data;
    },
    setLights (state, array) {
        state.lights = array;
    },
    setUserName (state, key) {
        state.credentials.username = key;
    }
};

const actions = {
    increment: ({commit}) => commit('increment'),
    decrement: ({commit}) => commit('decrement'),
    getBridges: ({commit}) => {
        axios.get(`https://discovery.meethue.com/`)
            .then(response => {
                console.dir(response.data);
                commit('setBridges', response.data)
            })
            .catch(e => {
                console.error(e);
            })
    },
    newUser: ({commit, state}) => {
        let url = `http://${state.bridges[0].internalipaddress}/api`;
        // if (state.devMode) {
        //     url = `http://${state.mainAddress}/api`
        // }
        axios.post(url, {
            devicetype: "my_hue_app#iphone peter"
        })
            .then(response => {
                console.dir(response.data);
                if (response.data[0].success) {
                    console.dir(response.data[0].success);
                    const username = response.data[0].success.username;
                    commit('setUserName', username)
                }
                // commit('setBridges', response.data)
            })
            .catch(e => {
                console.error(e);
            })
    },
    getLights: ({commit, state}) => {
        const bridge = state.bridges[0].internalipaddress;
        const user  = state.credentials.username;
        axios.get(`http://${bridge}/api/${user}/lights`)
            .then(response => {
                let arr = [];
                const data = response.data;
                // push identification key a attribute to object in array
                for(let key in data){
                    data[key]["key"] = key;
                    arr.push(data[key]);
                }
                // console.dir(arr);
                commit('setLights', arr)
            })
            .catch(e => {
                console.error(e);
            })
    },
    switchPower: ({commit, state, dispatch}, k) => {
        const bridge = state.bridges[0].internalipaddress;
        const user  = state.credentials.username;
        const url = `http://${bridge}/api/${user}/lights/${k}/state`;
        const singleLight = state.lights.filter(light =>  light.key === k);
        let power = singleLight[0].state.on;

        if (power === true) {
            power = false;
        } else {
            power = true;
        }
        axios.put(url, {
            on: power
        })
            .then(response => {
                const data = response.data;
                // console.dir(data);
                dispatch('getLights');
            })
            .catch(e => {
                console.error(e);
            })
    },
    changeHueState: ({commit, state, dispatch}, object) => {
        const bridge = state.bridges[0].internalipaddress;
        const user  = state.credentials.username;
        const url = `http://${bridge}/api/${user}/lights/${object.key}/state`;

        axios.put(url, object.body)
            .then(response => {
                const data = response.data;
                console.dir(data);
                dispatch('getLights');
            })
            .catch(e => {
                console.error(e);
            })
    },
};

export default {
    state,
    mutations,
    actions,
};
