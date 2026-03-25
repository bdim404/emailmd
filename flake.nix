{
  description = "emailmd – Turn markdown into responsive email-safe HTML";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        emailmd = pkgs.stdenv.mkDerivation {
          pname = "emailmd";
          version = "0.1.2";

          src = pkgs.fetchurl {
            url = "https://registry.npmjs.org/emailmd/-/emailmd-0.1.2.tgz";
            hash = "sha256-WnQmQiAmuzgwKjJhUuNnyNA9veMb8O8l8vS07RmOFzQ=";
          };

          dontBuild = true;

          installPhase = ''
            runHook preInstall
            mkdir -p $out/lib/node_modules/emailmd
            cp -r dist package.json README.md LICENSE $out/lib/node_modules/emailmd/
            runHook postInstall
          '';

          meta = with pkgs.lib; {
            description = "Turn markdown into responsive, email-safe HTML";
            homepage = "https://emailmd.dev";
            license = licenses.mit;
            maintainers = [ ];
            platforms = platforms.all;
          };
        };

      in {
        packages.default = emailmd;
        packages.emailmd = emailmd;

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [ nodejs_20 nodePackages.npm ];
        };

        overlays.default = _: _: { inherit emailmd; };
      }
    );
}
