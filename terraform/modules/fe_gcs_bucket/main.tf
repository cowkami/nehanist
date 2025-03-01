resource "google_storage_bucket" "bucket" {
  name                        = "nehanist-fe-${var.env}"
  project                     = var.project_id
  location                    = var.location
  uniform_bucket_level_access = true

  versioning {
    enabled = false
  }
}
