{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem
    (system: let
      pkgs = import nixpkgs {
        inherit system;
      };
    in {
      packages.default = pkgs.buildNpmPackage {
        pname = "patron-ui";
        version = "0.1.0";
        src = ./.;

        npmDepsHash = "sha256-76hd+8m6FHK3jAeXXJqihG6NnAI+03vyoPf6g+iul6g=";

        installPhase = ''
            cp -r build $out
        '';
      };
    });
}