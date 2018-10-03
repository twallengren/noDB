import React, { Component } from 'react';

class Tutorial extends Component {

    render() {
        return (

            <div className="Tutorial">

                <h1>Learn the Rules</h1>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/s2rE_voavMo?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                <p className="aboutText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel est hendrerit, tempor nibh ut, faucibus ex. Morbi cursus dapibus sem, sit amet placerat nunc efficitur at. Nulla placerat purus sed augue luctus porttitor. Vivamus varius purus non quam suscipit vestibulum. Fusce eu ligula vitae quam faucibus semper eleifend a turpis. Fusce eleifend eleifend purus, et aliquam magna vestibulum in. Aliquam ac justo dictum, pharetra leo eu, sollicitudin nisi.</p>

                <h2>1. Any live cell with fewer than two live neighbors dies, as if by under population.</h2>

                <p className="aboutText">Aliquam sit amet feugiat dui. Suspendisse quis magna fermentum, congue nulla eu, accumsan quam. Ut nec arcu luctus, tincidunt odio quis, vulputate lorem. Suspendisse enim orci, gravida sed erat vitae, commodo sodales lacus. Aenean vitae efficitur ante. Vivamus eu tristique erat. Pellentesque semper congue est, non interdum libero dignissim vel.</p>

                <h2>2. Any live cell with two or three live neighbors lives on to the next generation.</h2>

                <p className="aboutText">Mauris vitae purus eu lorem tristique molestie. Maecenas eget mi lacus. Donec in velit ut justo tincidunt mattis nec id felis. Etiam venenatis diam risus, at iaculis neque pellentesque vel. Nullam fermentum neque vitae est tincidunt pellentesque. Cras quis tempus eros. Sed auctor et leo quis posuere. Donec sed ornare sapien. Cras vitae cursus urna. Cras ullamcorper eget tellus vel ornare. Ut mollis elementum odio at ornare. Donec nec arcu nulla. Nunc et dignissim enim, et maximus tortor.</p>

                <h2>3. Any live cell with more than three live neighbors dies, as if by overpopulation.</h2>

                <p className="aboutText">Sed ullamcorper dignissim dui, egestas imperdiet eros malesuada non. Nunc consectetur suscipit nunc. Suspendisse non tempor sem, sit amet viverra erat. Pellentesque sollicitudin, nunc ut hendrerit interdum, ex ex condimentum nisl, in varius nisl purus at ante. Suspendisse ultricies, metus sagittis tincidunt bibendum, ante nulla volutpat nisi, sit amet ornare erat magna nec risus. Aliquam erat volutpat. Aenean scelerisque ac felis vitae malesuada. Donec nec ultricies libero, in accumsan libero. Quisque pharetra ut ipsum eget congue. Quisque sem lorem, sagittis a lectus pretium, feugiat tincidunt nibh. Duis tincidunt libero ut lorem euismod, ut auctor justo dignissim. Phasellus dignissim metus eleifend blandit suscipit. Praesent sodales venenatis eros auctor tristique. Curabitur in lectus condimentum, gravida tellus id, efficitur diam. Nullam lobortis, sem vitae varius rutrum, risus sapien consequat sem, non aliquam enim libero id orci. Suspendisse quis dapibus lectus.</p>

                <h2>4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</h2>

                <p className="aboutText">Suspendisse potenti. Nunc libero ligula, hendrerit ac augue sit amet, accumsan fermentum nulla. Nulla condimentum ultricies sem, id aliquam lacus semper id. Ut blandit et ex eget vestibulum. Sed vel elit vel turpis efficitur congue. Nulla facilisi. Maecenas nec erat leo. Etiam tempus est non dolor sagittis sagittis. Vivamus finibus lorem eget nunc egestas, et luctus ligula sodales. Sed in neque non urna vestibulum vehicula. Donec at accumsan ligula, a tincidunt diam.</p>

            </div>

        )
    }

}

export default Tutorial;