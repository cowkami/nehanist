module "fe_gcs_bucket" {
  source      = "../modules/fe_gcs_bucket"
  env         = "dev"
  project_id  = "nehanist-dev"
  location    = "US"
}

resource "google_storage_bucket_object" "files" {
  for_each = fileset(var.fe_source_dir, "**")

  bucket = module.fe_gcs_bucket.name
  name   = each.value
  source = "${var.fe_source_dir}/${each.value}"
}
