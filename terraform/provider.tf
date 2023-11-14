# tells Terraform which provider to use and the region where to create the resources
provider "aws" {
  region = var.region

  default_tags {
    tags = {
      ManagedBy = "Terraform"
    }
  }
}
