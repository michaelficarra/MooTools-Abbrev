Abbrev
======

`Abbrev` is an `Array` extenstion that calculates the unique
abbreviations for the set of `String`s contained in the `Array`.
Inspired by [Ruby's Abbrev class](http://ruby-doc.org/core/classes/Abbrev.html)


How To Use
----------

The simplest way to use the `Abbrev` class is by calling `Array`'s
`abbrev()` method. For example, `['ruby','rules'].abbrev()` would
produce the hash:

	{
		"rub": "ruby",
		"ruby": "ruby",
		"rul": "rules",
		"rule": "rules",
		"rules": "rules"
	}

An `Array` containing only a single `String` element will still
produce a useful mapping. For example, `['ruby'].abbrev()` would
produce:

	{
		"r": "ruby",
		"ru": "ruby",
		"rub": "ruby",
		"ruby": "ruby"
	}

An empty `Array` produces an empty hash. `[].abbrev()` produces `{}`.

Duplicate entries are treated as a single entry. For example,
`['a','abc','abc'].abbrev()` would produce:

	{
		"a": "a",
		"ab": "abc",
		"abc": "abc"
	}

`Abbrev` attempts to coerce non-`String`s to `String`s. For example,
`[123,'1234'].abbrev()` would produce:

	{
		"123": 123,
		"1234": "1234"
	}


Other Features
--------------

The `abbrev()` method accepts one optional argument, a pattern that
filters abbreviations. Only abbreviations that match the pattern (or
begin with the `String` if a `String` is provided instead of a
`RegExp`) will be included in the hash output. For example,
`['a','abc'].abbrev(/c/)` will produce `{"abc": "abc"}`. Notice how
the mapping from `"ab"` to `"abc"` is not included because the
abbreviation, not the target, must match the pattern.


Additional Info
---------------

I am always open for feature requests or any feedback.
I can be reached at [Github](http://github.com/michaelficarra).

Thanks to the Ruby community for the original idea and implementation.
