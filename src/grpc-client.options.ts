import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export class GrpcClienteOpciones {
  public static crearOpciones(urlServidor, nombrePaquete, protoPath) {
    var grpcClientOptions: ClientOptions = {
      transport: Transport.GRPC,
      options: {
        url: urlServidor,
        package: nombrePaquete,
        protoPath: [join(__dirname, protoPath)],
        loader: {
          keepCase: true,
          longs: String,
          enums: Number,
          defaults: true,
          oneofs: true,
          includeDirs: [join(__dirname)],
        },
      },
    };
    return grpcClientOptions;
  }
}
