terraform {
  backend "s3" {
    bucket = "terraform-state-ello-app" # stores terraform app state
    key    = "test/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}