use tauri::Manager;
use tauri_plugin_updater::UpdaterExt;

/// Check for a new version on GitHub Releases.
/// Returns a JSON string:
///   { "hasUpdate": true,  "version": "1.1.0", "body": "..." }
///   { "hasUpdate": false }
///   { "error": "..." }
#[tauri::command]
async fn check_for_update(app: tauri::AppHandle) -> String {
    match app.updater() {
        Ok(updater) => match updater.check().await {
            Ok(Some(update)) => {
                let version = update.version.clone();
                let body = update.body.clone().unwrap_or_default();
                serde_json::json!({
                    "hasUpdate": true,
                    "version": version,
                    "body": body
                })
                .to_string()
            }
            Ok(None) => serde_json::json!({ "hasUpdate": false }).to_string(),
            Err(e) => serde_json::json!({ "error": e.to_string() }).to_string(),
        },
        Err(e) => serde_json::json!({ "error": e.to_string() }).to_string(),
    }
}

/// Download and install the update, then restart the app.
#[tauri::command]
async fn install_update(app: tauri::AppHandle) -> String {
    match app.updater() {
        Ok(updater) => match updater.check().await {
            Ok(Some(update)) => {
                let _ = update
                    .download_and_install(|_, _| {}, || {})
                    .await;
                app.restart();
            }
            Ok(None) => {}
            Err(e) => return serde_json::json!({ "error": e.to_string() }).to_string(),
        },
        Err(e) => return serde_json::json!({ "error": e.to_string() }).to_string(),
    }
    serde_json::json!({ "ok": true }).to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![check_for_update, install_update])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
