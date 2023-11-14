terraform {
  backend "s3" {
    bucket = "terraform-state-ello-app"
    key    = "test/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}