package main

import (
	"regexp"
	"fmt"
	"os"
)

var windowsRegex = regexp.MustCompile("Windows")
var windowsPhoneRegex = regexp.MustCompile("Windows Phone")
var macRegex = regexp.MustCompile("Mac")
var iosRegex = regexp.MustCompile("iOS")
var androidRegex = regexp.MustCompile("Android")
var blackberryRegex = regexp.MustCompile("BlackBerry")

func runtimeAssert(err error) {
	if err != nil {
		message := fmt.Sprintf("Assertion failed: %s...", err.Error())
		fmt.Fprintln(os.Stderr, message)
		os.Exit(500)
	}
}

func getPlatform(ua string) Platform {
	uas := gApplicationState.Parser.Parse(ua)
	short := "default"
	if (windowsRegex.MatchString(uas.Os.Family)) {
		short = "win"
	}

	if (windowsPhoneRegex.MatchString(uas.Os.Family)) {
		short = "wp"
	}

	if (macRegex.MatchString(uas.Os.Family)) {
		short = "mac sf"
	}

	if (iosRegex.MatchString(uas.Os.Family)) {
		short = "ios sf"
	}

	if (androidRegex.MatchString(uas.Os.Family)) {
		short = "roboto android"
	}

	if (blackberryRegex.MatchString(uas.Os.Family)) {
		short = "bb10"
	}

	return Platform{
		Short: short,
	}
}