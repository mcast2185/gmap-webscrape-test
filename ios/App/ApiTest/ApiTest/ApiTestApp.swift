//
//  ApiTestApp.swift
//  ApiTest
//
//  Created by Mario Castro on 11/10/22.
//

import SwiftUI

@main
struct ApiTestApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
