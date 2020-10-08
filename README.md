# palette-visualiser-3

This is a rewrite of the palette visualiser
[here](https://github.com/JulianNicholls/Palette-Visualiser)
written with React and Webpack 4.

## Change Log

* 03/2018: Update to React 16.3, removing deprecated functions.
* 03/2018: Changed the colour conversions to use objects rather than arrays.

* 07/2018: The latest (well, next, actually) version of extract-text-webpack-plugin
           works with Webpack 4 and is now enabled.

* 08/2018: Display the list of named HTML colours, e.g. Dark Slate Blue

* 10/2018: Updated to use the context API.
* 10/2018: Add the [xkcd survey colours](https://blog.xkcd.com/2010/05/03/color-survey-results)
           as an alternative colour list.

* 11/2018: Change the read-only swatch between the RGB and HSL inputs into a
           colorpicker input.

* 01/2019: Add PropTypes. As a result, found a bug which didn't seem to manifest
           itself, but fixed anyway

* 03/2019: Update modules, inc React to 16.8.x and Babel to 7.x. Convert to
           React Hooks.

* 04/2019: Add explicit AAA and AA text to colour blocks. Re-factoring and some
           bug fixes.

* 03/2020: Convert to Typescript

* 05/2020: Clicking a colour in the colour lists sets the fifth palette colour.

* 06/2020: Change top section to become one. The palette colours can now be added to
           and deleted, meaning that there can be more than 5 at a time. Clicking a
           colour in the colour lists now adds a colour, rather than replacing colour
           five.

* 10/2020: Add compact mode, which removes the colour hex codes from the colour
           blocks. Add 3 value decimal edit mode for RGB.

## Git client

I have used Git at the command-line for more than 10 years. Over that time, I have tried
many different graphical shells for Git, without finding one that was easier
and nicer to use than the command-line (in my view).

I have now found that [GitKraken](https://www.gitkraken.com) is an excellent
Git shell and would advise using it to everyone.

## Questions

If you have any questions about this repository, or any others of mine, please
don't hesitate to contact me.
