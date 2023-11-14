output "alb_dns_name" {
  value       = module.alb.alb_dns_name
  description = "DNS name of ALB"
}

output "github_action_role_arn" {
  value       = aws_iam_role.github_actions_role.arn
  description = "ARN of IAM role for GitHub Actions"
}

output "ecr_repository_name" {
  value       = module.ecr.repository_name
  description = "Name of ECR repository"
}
