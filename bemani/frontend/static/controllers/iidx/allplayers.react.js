/*** @jsx React.DOM */

var all_players = createReactClass({

    getInitialState: function(props) {
        return {
            players: window.players,
        };
    },

    componentDidMount: function() {
        this.refreshPlayers();
    },

    refreshPlayers: function() {
        AJAX.get(
            Link.get('refresh'),
            function(response) {
                this.setState({
                    players: response.players,
                });
                // Refresh every 30 seconds
                setTimeout(this.refreshPlayers, 30000);
            }.bind(this)
        );
    },

    render: function() {
        return (
            <div>
                <div className="section">
                    <Table
                        className="list players"
                        columns={[
                            {
                                name: 'DJ Name',
                                render: function(userid) {
                                    var player = this.state.players[userid];
                                    return <a href={Link.get('player', userid)}>{ player.name }</a>;
                                }.bind(this),
                                sort: function(aid, bid) {
                                    var a = this.state.players[aid];
                                    var b = this.state.players[bid];
                                    return a.name.localeCompare(b.name);
                                }.bind(this),
                            },
                            {
                                name: 'IIDX ID',
                                render: function(userid) {
                                    var player = this.state.players[userid];
                                    return player.extid;
                                }.bind(this),
                                sort: function(aid, bid) {
                                    var a = this.state.players[aid];
                                    var b = this.state.players[bid];
                                    return a.extid.localeCompare(b.extid);
                                }.bind(this),
                            },
                            {
                                name: 'Play Count',
                                render: function(userid) {
                                    var player = this.state.players[userid];
                                    return player.sp + player.dp;
                                }.bind(this),
                                sort: function(aid, bid) {
                                    var a = this.state.players[aid];
                                    var b = this.state.players[bid];
                                    return (a.sp + a.dp) - (b.sp + b.dp);
                                }.bind(this),
                                reverse: true,
                            },
                            {
                                name: 'Arcade',
                                render: function(userid) {
                                    var player = this.state.players[userid];
                                    return player.arcade;
                                }.bind(this),
                                sort: function(aid, bid) {
                                    var a = this.state.players[aid];
                                    var b = this.state.players[bid];
                                    return a.arcade.localeCompare(b.arcade);
                                }.bind(this),
                            },
                            {
                                name: 'SP Dan',
                                render: function(userid) {
                                    var player = this.state.players[userid];
                                    return player.sdan;
                                }.bind(this),
                                sort: function(aid, bid) {
                                    var a = this.state.players[aid];
                                    var b = this.state.players[bid];
                                    return a.srank - b.srank;
                                }.bind(this),
                                reverse: true,
                            },
                            {
                                name: 'DP Dan',
                                render: function(userid) {
                                    var player = this.state.players[userid];
                                    return player.ddan;
                                }.bind(this),
                                sort: function(aid, bid) {
                                    var a = this.state.players[aid];
                                    var b = this.state.players[bid];
                                    return a.drank - b.drank;
                                }.bind(this),
                                reverse: true,
                            },
                            {
                                name: 'SP DJ Points',
                                render: function(userid) {
                                    var player = this.state.players[userid];
                                    return player.sdjp;
                                }.bind(this),
                                sort: function(aid, bid) {
                                    var a = this.state.players[aid];
                                    var b = this.state.players[bid];
                                    return a.sdjp - b.sdjp;
                                }.bind(this),
                                reverse: true,
                            },
                            {
                                name: 'DP DJ Points',
                                render: function(userid) {
                                    var player = this.state.players[userid];
                                    return player.ddjp;
                                }.bind(this),
                                sort: function(aid, bid) {
                                    var a = this.state.players[aid];
                                    var b = this.state.players[bid];
                                    return a.ddjp - b.ddjp;
                                }.bind(this),
                                reverse: true,
                            },
                        ]}
                        rows={Object.keys(this.state.players)}
                        paginate={10}
                    />
                </div>
            </div>
        );
    },
});

ReactDOM.render(
    React.createElement(all_players, null),
    document.getElementById('content')
);
