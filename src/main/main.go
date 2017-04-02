package main

import (
	"encoding/json"
	"fmt"
	"os"
	"github.com/ua-parser/uap-go/uaparser"
	"html/template"
)

const ENVIRONMENT = "Environment.json"

func loadConfig(applicationState *ApplicationState) {
	configuration := Configuration{}
	f, err := os.Open(ENVIRONMENT)
	runtimeAssert(err)
	defer f.Close()
	d := json.NewDecoder(f)
	d.Decode(&configuration)
	applicationState.Configuration = &configuration
}

func loadApplication(applicationState *ApplicationState) {
	applicationState.Files = map[string]string{}
	applicationState.FilesBytes = map[string][]byte{}
	applicationState.Templates = map[string]*template.Template{}

	UaparserMust := func(t *uaparser.Parser, err error) *uaparser.Parser {
		if err != nil {
			panic(err)
		}
		return t
	}
	applicationState.Parser =
		UaparserMust(uaparser.New("regexes.yaml"))

	applicationState.Page.Title = "Paradise"
}

func main() {
	applicationState := ApplicationState{}
	fmt.Fprintln(os.Stdout, "Loading...")
	loadConfig(&applicationState)
	loadApplication(&applicationState)
	fmt.Fprintf(os.Stdout, "Running in %s mode\n", applicationState.Configuration.Mode)
	fmt.Fprintf(os.Stdout, "Listening on %s...\n", applicationState.Configuration.Address)
	runApplicationSimple(&applicationState)
}