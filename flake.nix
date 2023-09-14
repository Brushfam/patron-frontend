{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.nix-filter.url = "github:numtide/nix-filter";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = {
    self,
    nixpkgs,
    nix-filter,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem
    (system: let
      pkgs = import nixpkgs {
        inherit system;
      };

      src = nix-filter.lib.filter {
        root = ./.;

        include = [
          "public"
          "src"
          ./package.json
          ./package-lock.json
          ./tsconfig.json
        ];
      };

      mkFrontend = REACT_APP_SERVER_URL:
        pkgs.buildNpmPackage {
          inherit REACT_APP_SERVER_URL src;

          pname = "patron-ui";
          version = "0.1.0";

          npmDepsHash = "sha256-EbeLcRpWk4K53VVbdvIC3NR80YmIRtwlXYRLQZVJjDE=";

          installPhase = ''
            cp -r build $out
          '';
        };
    in {
      formatter = pkgs.alejandra;
      lib = {
        inherit mkFrontend;
      };
      packages = {
        development = mkFrontend "http://localhost:3000";
        production = mkFrontend "https://api.patron.works";
      };
      apps.default = flake-utils.lib.mkApp {
        drv = let
          root = self.packages.${system}.development;
        in pkgs.writeShellScriptBin "dev-server" ''
          ${pkgs.lib.getExe pkgs.static-web-server} \
            --port 8080 \
            --root ${root} \
            --page-fallback ${root}/index.html \
            --log-level info
        '';
      };
    });
}