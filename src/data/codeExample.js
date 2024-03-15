export const codeExample =
    "#![cfg_attr(not(feature = \"std\"), no_std, no_main)]\n" +
    "\n" +
    "#[ink::contract]\n" +
    "mod flipper {\n" +
    "\n" +
    "    /// Defines the storage of your contract.\n" +
    "    /// Add new fields to the below struct in order\n" +
    "    /// to add new static storage fields to your contract.\n" +
    "    #[ink(storage)]\n" +
    "    pub struct Flipper {\n" +
    "        /// Stores a single `bool` value on the storage.\n" +
    "        value: bool,\n" +
    "    }\n" +
    "\n" +
    "    impl Flipper {\n" +
    "        /// Constructor that initializes the `bool` value to the given `init_value`.\n" +
    "        #[ink(constructor)]\n" +
    "        pub fn new(init_value: bool) -> Self {\n" +
    "            Self { value: init_value }\n" +
    "        }\n" +
    "\n" +
    "        /// Constructor that initializes the `bool` value to `false`.\n" +
    "        ///\n" +
    "        /// Constructors can delegate to other constructors.\n" +
    "        #[ink(constructor)]\n" +
    "        pub fn default() -> Self {\n" +
    "            Self::new(Default::default())\n" +
    "        }\n" +
    "\n" +
    "        /// A message that can be called on instantiated contracts.\n" +
    "        /// This one flips the value of the stored `bool` from `true`\n" +
    "        /// to `false` and vice versa.\n" +
    "        #[ink(message)]\n" +
    "        pub fn flip(&mut self) {\n" +
    "            self.value = !self.value;\n" +
    "        }\n" +
    "\n" +
    "        /// Simply returns the current value of our `bool`.\n" +
    "        #[ink(message)]\n" +
    "        pub fn get(&self) -> bool {\n" +
    "            self.value\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`\n" +
    "    /// module and test functions are marked with a `#[test]` attribute.\n" +
    "    /// The below code is technically just normal Rust code.\n" +
    "    #[cfg(test)]\n" +
    "    mod tests {\n" +
    "        /// Imports all the definitions from the outer scope so we can use them here.\n" +
    "        use super::*;\n" +
    "\n" +
    "        /// We test if the default constructor does its job.\n" +
    "        #[ink::test]\n" +
    "        fn default_works() {\n" +
    "            let flipper = Flipper::default();\n" +
    "            assert_eq!(flipper.get(), false);\n" +
    "        }\n" +
    "\n" +
    "        /// We test a simple use case of our contract.\n" +
    "        #[ink::test]\n" +
    "        fn it_works() {\n" +
    "            let mut flipper = Flipper::new(false);\n" +
    "            assert_eq!(flipper.get(), false);\n" +
    "            flipper.flip();\n" +
    "            assert_eq!(flipper.get(), true);\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "\n" +
    "    /// This is how you'd write end-to-end (E2E) or integration tests for ink! contracts.\n" +
    "    ///\n" +
    "    /// When running these you need to make sure that you:\n" +
    "    /// - Compile the tests with the `e2e-tests` feature flag enabled (`--features e2e-tests`)\n" +
    "    /// - Are running a Substrate node which contains `pallet-contracts` in the background\n" +
    "    #[cfg(all(test, feature = \"e2e-tests\"))]\n" +
    "    mod e2e_tests {\n" +
    "        /// Imports all the definitions from the outer scope so we can use them here.\n" +
    "        use super::*;\n" +
    "\n" +
    "        /// A helper function used for calling contract messages.\n" +
    "        use ink_e2e::build_message;\n" +
    "\n" +
    "        /// The End-to-End test `Result` type.\n" +
    "        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;\n" +
    "\n" +
    "        /// We test that we can upload and instantiate the contract using its default constructor.\n" +
    "        #[ink_e2e::test]\n" +
    "        async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {\n" +
    "            // Given\n" +
    "            let constructor = FlipperRef::default();\n" +
    "\n" +
    "            // When\n" +
    "            let contract_account_id = client\n" +
    "                .instantiate(\"flipper\", &ink_e2e::alice(), constructor, 0, None)\n" +
    "                .await\n" +
    "                .expect(\"instantiate failed\")\n" +
    "                .account_id;\n" +
    "\n" +
    "            // Then\n" +
    "            let get = build_message::<FlipperRef>(contract_account_id.clone())\n" +
    "                .call(|flipper| flipper.get());\n" +
    "            let get_result = client.call_dry_run(&ink_e2e::alice(), &get, 0, None).await;\n" +
    "            assert!(matches!(get_result.return_value(), false));\n" +
    "\n" +
    "            Ok(())\n" +
    "        }\n" +
    "\n" +
    "        /// We test that we can read and write a value from the on-chain contract contract.\n" +
    "        #[ink_e2e::test]\n" +
    "        async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {\n" +
    "            // Given\n" +
    "            let constructor = FlipperRef::new(false);\n" +
    "            let contract_account_id = client\n" +
    "                .instantiate(\"flipper\", &ink_e2e::bob(), constructor, 0, None)\n" +
    "                .await\n" +
    "                .expect(\"instantiate failed\")\n" +
    "                .account_id;\n" +
    "\n" +
    "            let get = build_message::<FlipperRef>(contract_account_id.clone())\n" +
    "                .call(|flipper| flipper.get());\n" +
    "            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;\n" +
    "            assert!(matches!(get_result.return_value(), false));\n" +
    "\n" +
    "            // When\n" +
    "            let flip = build_message::<FlipperRef>(contract_account_id.clone())\n" +
    "                .call(|flipper| flipper.flip());\n" +
    "            let _flip_result = client\n" +
    "                .call(&ink_e2e::bob(), flip, 0, None)\n" +
    "                .await\n" +
    "                .expect(\"flip failed\");\n" +
    "\n" +
    "            // Then\n" +
    "            let get = build_message::<FlipperRef>(contract_account_id.clone())\n" +
    "                .call(|flipper| flipper.get());\n" +
    "            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;\n" +
    "            assert!(matches!(get_result.return_value(), true));\n" +
    "\n" +
    "            Ok(())\n" +
    "        }\n" +
    "    }\n" +
    "}"
