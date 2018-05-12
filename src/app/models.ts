export const hierarchialGraph = {
    nodes: [
        {
        id: 'start',
        label: 'Start node'
        }, {
        id: '1',
        label: 'node1',
        }, {
        id: '2',
        label: 'node2',
        }, {
        id: '3',
        label: 'node3'
        }, {
        id: '4',
        label: 'node4'
        }, {
        id: '5',
        label: 'node5'
        }, {
        id: '6',
        label: 'node6'
        }, {
        id: '7',
        label: 'node7'
        }
    ],
    links: [
        {
        source: 'start',
        target: '1'
        }, {
        source: 'start',
        target: '2'
        }, {
        source: '1',
        target: '3'
        }, {
        source: '2',
        target: '4'
        }, {
        source: '2',
        target: '6'
        }, {
        source: '3',
        target: '5'
        }, {
        source: '5',
        target: '7'
        }
    ]
};
